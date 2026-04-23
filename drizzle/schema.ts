import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const contacts = mysqlTable("contacts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  business: text("business").notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
