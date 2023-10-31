import { sql } from "drizzle-orm";
import { integer, text, sqliteTable, primaryKey, blob } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

function currentTimestamp() {
  return sql`CURRENT_TIMESTAMP`;
}

export const chat = sqliteTable("chat", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(currentTimestamp()),
});

export const participant = sqliteTable("participant", {
  chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id).notNull(),
  joinedAt: integer("joined_at", { mode: "timestamp" })
    .default(currentTimestamp()),
  lastReadAt: integer("last_read_at", { mode: "timestamp" })
    .default(currentTimestamp()),
}, (p) => ({
  compoundKey: primaryKey(p.chatId, p.userId),
}));

export const message = sqliteTable("message", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }).notNull(),
  senderId: text("sender_id").references(() => user.id).notNull(),
  text: text("text"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(currentTimestamp()),
});

// auth tables (lucia)
export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	// other user attributes
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  image: text("image"),
});

export const session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", {
		mode: "bigint"
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint"
	}).notNull()
});

export const key = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password")
});
