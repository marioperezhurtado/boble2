import { integer, text, sqliteTable, primaryKey, blob } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const chat = sqliteTable("chat", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const participant = sqliteTable("participant", {
  chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  joinedAt: integer("joined_at", { mode: "timestamp" }),
  lastReadAt: integer("last_read_at", { mode: "timestamp" }),
}, (p) => ({
  compoundKey: primaryKey(p.chatId, p.userId),
}));

export const message = sqliteTable("message", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }).notNull(),
  senderId: text("sender_id").references(() => user.id).notNull(),
  text: text("text"),
  type: text("type", {
    enum: [
      "text",
      "image",
      "gif",
      "video",
      "audio",
      "file"
    ] as const
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const contact = sqliteTable("contact", {
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  contactId: text("contact_id")
    .references(() => user.id, { onDelete: "cascade" }).notNull(),
  alias: text("alias").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
}, (p) => ({
  compoundKey: primaryKey(p.userId, p.contactId),
}));

export const block = sqliteTable("block", {
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  blockedUserId: text("blocked_user_id")
    .references(() => user.id, { onDelete: "cascade" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
}, (p) => ({

  compoundKey: primaryKey(p.userId, p.blockedUserId),
}));

export const emailVerificationToken = sqliteTable("email_verification_token", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull().unique(),
  expires: integer("expires", { mode: "timestamp" }).notNull()
});

export const passwordResetToken = sqliteTable("password_reset_token", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp" }).notNull()
});

// auth tables (lucia)

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  // other user attributes
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  name: text("name").notNull(),
  image: text("image"),
  status: text("status"),
});

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
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
    .references(() => user.id, { onDelete: "cascade" }),
  hashedPassword: text("hashed_password")
});
