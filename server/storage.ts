import { type User, type InsertUser, type Seat, type InsertSeat, users, seats } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, count, isNull, isNotNull } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Seat management methods
  getAllSeats(): Promise<Seat[]>;
  getSeat(id: string): Promise<Seat | undefined>;
  registerSeat(seatId: string, studentName: string): Promise<Seat>;
  clearSeat(seatId: string): Promise<Seat>;
  updateStudentName(seatId: string, studentName: string): Promise<Seat>;
  initializeSeats(): Promise<void>;
  getSeatStats(): Promise<{
    totalSeats: number;
    occupiedSeats: number;
    availableSeats: number;
    occupancyRate: number;
    groupStats: Array<{
      groupNumber: number;
      occupied: number;
      available: number;
      total: number;
      occupancyRate: number;
    }>;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private seats: Map<string, Seat>;

  constructor() {
    this.users = new Map();
    this.seats = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllSeats(): Promise<Seat[]> {
    return Array.from(this.seats.values()).sort((a, b) => {
      if (a.groupNumber !== b.groupNumber) return a.groupNumber - b.groupNumber;
      if (a.tableNumber !== b.tableNumber) return a.tableNumber - b.tableNumber;
      return a.seatNumber - b.seatNumber;
    });
  }

  async getSeat(id: string): Promise<Seat | undefined> {
    return this.seats.get(id);
  }

  async registerSeat(seatId: string, studentName: string): Promise<Seat> {
    const seat = this.seats.get(seatId);
    if (!seat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    if (seat.studentName) {
      const error = new Error("Chỗ ngồi đã có học sinh");
      (error as any).code = 'CONFLICT';
      throw error;
    }
    
    const updatedSeat = { ...seat, studentName };
    this.seats.set(seatId, updatedSeat);
    return updatedSeat;
  }

  async clearSeat(seatId: string): Promise<Seat> {
    const seat = this.seats.get(seatId);
    if (!seat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    
    const clearedSeat = { ...seat, studentName: null };
    this.seats.set(seatId, clearedSeat);
    return clearedSeat;
  }

  async updateStudentName(seatId: string, studentName: string): Promise<Seat> {
    const seat = this.seats.get(seatId);
    if (!seat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    if (!seat.studentName) {
      const error = new Error("Chỗ ngồi chưa có học sinh để cập nhật tên");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    
    const updatedSeat = { ...seat, studentName };
    this.seats.set(seatId, updatedSeat);
    return updatedSeat;
  }

  async initializeSeats(): Promise<void> {
    // Initialize 4 groups, each with 6 tables, each table with 2 seats
    for (let groupNumber = 1; groupNumber <= 4; groupNumber++) {
      for (let tableNumber = 1; tableNumber <= 6; tableNumber++) {
        for (let seatNumber = 1; seatNumber <= 2; seatNumber++) {
          const seatId = `G${groupNumber}-T${tableNumber}-S${seatNumber}`;
          const seat: Seat = {
            id: seatId,
            groupNumber,
            tableNumber,
            seatNumber,
            studentName: null,
          };
          this.seats.set(seatId, seat);
        }
      }
    }
  }

  async getSeatStats(): Promise<{
    totalSeats: number;
    occupiedSeats: number;
    availableSeats: number;
    occupancyRate: number;
    groupStats: Array<{
      groupNumber: number;
      occupied: number;
      available: number;
      total: number;
      occupancyRate: number;
    }>;
  }> {
    const allSeats = Array.from(this.seats.values());
    const totalSeats = allSeats.length;
    const occupiedSeats = allSeats.filter(seat => seat.studentName).length;
    const availableSeats = totalSeats - occupiedSeats;
    const occupancyRate = totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 0;

    // Calculate group statistics
    const groupStats = [];
    for (let groupNumber = 1; groupNumber <= 4; groupNumber++) {
      const groupSeats = allSeats.filter(seat => seat.groupNumber === groupNumber);
      const occupied = groupSeats.filter(seat => seat.studentName).length;
      const total = groupSeats.length;
      const available = total - occupied;
      const groupOccupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

      groupStats.push({
        groupNumber,
        occupied,
        available,
        total,
        occupancyRate: groupOccupancyRate,
      });
    }

    return {
      totalSeats,
      occupiedSeats,
      availableSeats,
      occupancyRate,
      groupStats,
    };
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllSeats(): Promise<Seat[]> {
    return await db.select().from(seats).orderBy(seats.groupNumber, seats.tableNumber, seats.seatNumber);
  }

  async getSeat(id: string): Promise<Seat | undefined> {
    const result = await db.select().from(seats).where(eq(seats.id, id)).limit(1);
    return result[0];
  }

  async registerSeat(seatId: string, studentName: string): Promise<Seat> {
    const existingSeat = await this.getSeat(seatId);
    if (!existingSeat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    if (existingSeat.studentName) {
      const error = new Error("Chỗ ngồi đã có học sinh");
      (error as any).code = 'CONFLICT';
      throw error;
    }
    
    const result = await db.update(seats)
      .set({ studentName })
      .where(eq(seats.id, seatId))
      .returning();
    return result[0];
  }

  async clearSeat(seatId: string): Promise<Seat> {
    const existingSeat = await this.getSeat(seatId);
    if (!existingSeat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    
    const result = await db.update(seats)
      .set({ studentName: null })
      .where(eq(seats.id, seatId))
      .returning();
    return result[0];
  }

  async updateStudentName(seatId: string, studentName: string): Promise<Seat> {
    const existingSeat = await this.getSeat(seatId);
    if (!existingSeat) {
      const error = new Error("Chỗ ngồi không tồn tại");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    if (!existingSeat.studentName) {
      const error = new Error("Chỗ ngồi chưa có học sinh để cập nhật tên");
      (error as any).code = 'NOT_FOUND';
      throw error;
    }
    
    const result = await db.update(seats)
      .set({ studentName })
      .where(eq(seats.id, seatId))
      .returning();
    return result[0];
  }

  async initializeSeats(): Promise<void> {
    // Check if seats already exist
    const existingSeats = await db.select().from(seats).limit(1);
    if (existingSeats.length > 0) {
      return; // Seats already initialized
    }

    // Initialize 4 groups, each with 6 tables, each table with 2 seats
    const seatsToInsert: typeof seats.$inferInsert[] = [];
    for (let groupNumber = 1; groupNumber <= 4; groupNumber++) {
      for (let tableNumber = 1; tableNumber <= 6; tableNumber++) {
        for (let seatNumber = 1; seatNumber <= 2; seatNumber++) {
          const seatId = `G${groupNumber}-T${tableNumber}-S${seatNumber}`;
          seatsToInsert.push({
            id: seatId,
            groupNumber,
            tableNumber,
            seatNumber,
            studentName: null,
          });
        }
      }
    }

    await db.insert(seats).values(seatsToInsert);
  }

  async getSeatStats(): Promise<{
    totalSeats: number;
    occupiedSeats: number;
    availableSeats: number;
    occupancyRate: number;
    groupStats: Array<{
      groupNumber: number;
      occupied: number;
      available: number;
      total: number;
      occupancyRate: number;
    }>;
  }> {
    const allSeats = await this.getAllSeats();
    const totalSeats = allSeats.length;
    const occupiedSeats = allSeats.filter(seat => seat.studentName).length;
    const availableSeats = totalSeats - occupiedSeats;
    const occupancyRate = totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 0;

    // Calculate group statistics
    const groupStats = [];
    for (let groupNumber = 1; groupNumber <= 4; groupNumber++) {
      const groupSeats = allSeats.filter(seat => seat.groupNumber === groupNumber);
      const occupied = groupSeats.filter(seat => seat.studentName).length;
      const total = groupSeats.length;
      const available = total - occupied;
      const groupOccupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

      groupStats.push({
        groupNumber,
        occupied,
        available,
        total,
        occupancyRate: groupOccupancyRate,
      });
    }

    return {
      totalSeats,
      occupiedSeats,
      availableSeats,
      occupancyRate,
      groupStats,
    };
  }
}

export const storage = new DatabaseStorage();
