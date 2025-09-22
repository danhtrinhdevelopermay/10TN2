import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSeatSchema, clearSeatSchema, updateStudentNameSchema } from "@shared/schema";

// Admin password with fallback for development
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
if (!process.env.ADMIN_PASSWORD) {
  console.warn("Warning: Using default ADMIN_PASSWORD. Set ADMIN_PASSWORD environment variable for production.");
}

// Middleware to check admin authentication
function requireAdmin(req: any, res: any, next: any) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ error: "Không có quyền truy cập. Vui lòng đăng nhập với quyền lớp trưởng." });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize seats on startup
  await storage.initializeSeats();

  // Get all seats
  app.get("/api/seats", async (req, res) => {
    try {
      const seats = await storage.getAllSeats();
      res.json(seats);
    } catch (error) {
      console.error("Error fetching seats:", error);
      res.status(500).json({ error: "Không thể lấy danh sách chỗ ngồi" });
    }
  });

  // Get seat statistics
  app.get("/api/seats/stats", async (req, res) => {
    try {
      const stats = await storage.getSeatStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching seat stats:", error);
      res.status(500).json({ error: "Không thể lấy thống kê chỗ ngồi" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        res.json({ success: true, message: "Đăng nhập thành công" });
      } else {
        res.status(401).json({ error: "Mật khẩu không đúng. Vui lòng thử lại." });
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ error: "Lỗi đăng nhập" });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", async (req, res) => {
    try {
      // Properly destroy the session for security
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ error: "Lỗi đăng xuất" });
        }
        // Clear the session cookie
        res.clearCookie('connect.sid');
        res.json({ success: true, message: "Đăng xuất thành công" });
      });
    } catch (error) {
      console.error("Error during admin logout:", error);
      res.status(500).json({ error: "Lỗi đăng xuất" });
    }
  });

  // Check admin authentication status
  app.get("/api/admin/status", async (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // Register a student to a seat
  app.post("/api/seats/register", async (req, res) => {
    try {
      const validatedData = registerSeatSchema.parse(req.body);
      const seat = await storage.registerSeat(validatedData.seatId, validatedData.studentName);
      res.json(seat);
    } catch (error) {
      console.error("Error registering seat:", error);
      
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        if (errorCode === 'NOT_FOUND') {
          return res.status(404).json({ error: error.message });
        }
        if (errorCode === 'CONFLICT') {
          return res.status(409).json({ error: error.message });
        }
      }
      
      // Validation errors or other errors
      res.status(400).json({ error: error instanceof Error ? error.message : "Không thể đăng ký chỗ ngồi" });
    }
  });

  // Clear a seat (remove student) - Admin only
  app.delete("/api/seats/:seatId", requireAdmin, async (req, res) => {
    try {
      const validatedParams = clearSeatSchema.parse({ seatId: req.params.seatId });
      const seat = await storage.clearSeat(validatedParams.seatId);
      res.json(seat);
    } catch (error) {
      console.error("Error clearing seat:", error);
      
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        if (errorCode === 'NOT_FOUND') {
          return res.status(404).json({ error: error.message });
        }
      }
      
      res.status(400).json({ error: error instanceof Error ? error.message : "Không thể xóa chỗ ngồi" });
    }
  });

  // Update student name for a seat
  app.put("/api/seats/:seatId/student-name", async (req, res) => {
    try {
      const validatedData = updateStudentNameSchema.parse({ 
        seatId: req.params.seatId, 
        studentName: req.body.studentName 
      });
      const seat = await storage.updateStudentName(validatedData.seatId, validatedData.studentName);
      res.json(seat);
    } catch (error) {
      console.error("Error updating student name:", error);
      
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        if (errorCode === 'NOT_FOUND') {
          return res.status(404).json({ error: error.message });
        }
      }
      
      // Validation errors or other errors
      res.status(400).json({ error: error instanceof Error ? error.message : "Không thể cập nhật tên học sinh" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
