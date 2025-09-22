import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const seats = pgTable("seats", {
  id: varchar("id").primaryKey(),
  groupNumber: integer("group_number").notNull(),
  tableNumber: integer("table_number").notNull(),
  seatNumber: integer("seat_number").notNull(),
  studentName: text("student_name"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSeatSchema = createInsertSchema(seats).omit({
  id: true,
});

export const registerSeatSchema = z.object({
  seatId: z.string().min(1, "ID chỗ ngồi không được để trống"),
  studentName: z.string().trim().min(1, "Tên học sinh không được để trống").max(50, "Tên học sinh không được quá 50 ký tự"),
});

export const clearSeatSchema = z.object({
  seatId: z.string().min(1, "ID chỗ ngồi không được để trống"),
});

export const updateStudentNameSchema = z.object({
  seatId: z.string().min(1, "ID chỗ ngồi không được để trống"),
  studentName: z.string().trim().min(1, "Tên học sinh không được để trống").max(50, "Tên học sinh không được quá 50 ký tự"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSeat = z.infer<typeof insertSeatSchema>;
export type Seat = typeof seats.$inferSelect;
export type RegisterSeat = z.infer<typeof registerSeatSchema>;
export type ClearSeat = z.infer<typeof clearSeatSchema>;
export type UpdateStudentName = z.infer<typeof updateStudentNameSchema>;
