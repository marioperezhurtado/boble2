import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
 
export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at"),
});
