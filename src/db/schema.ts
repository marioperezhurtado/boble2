import { sql } from "drizzle-orm";
import { integer, text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import type { AdapterAccount } from "@auth/core/adapters"

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

// auth tables (auth.js)
export const user = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image")
})

export const account = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
)

export const session = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull()
})

export const verificationToken = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);
