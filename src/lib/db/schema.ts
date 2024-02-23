import { integer, text, pgTable, primaryKey, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { nanoid } from "./nanoid";

export const chat = pgTable("chat", {
  id: text("id").primaryKey().$defaultFn(() => `c_${nanoid(12)}`),
  createdAt: timestamp("created_at").notNull(),
});

export const participant = pgTable("participant", {
  chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  joinedAt: timestamp("joined_at").notNull(),
  lastReadAt: timestamp("last_read_at"),
}, (p) => ({
  pk: primaryKey({ columns: [p.chatId, p.userId] }),
}));

export const VALID_MESSAGE_TYPES = [
  "text",
  "link",
  "gif",
  "sticker",
  "image",
  "video",
  "audio",
  "document",
  "location",
  "contact",
] as const;

export const MEDIA_TYPES = ["image", "video", "audio", "document"];

export const message = pgTable("message", {
  id: text("id").primaryKey().$defaultFn(() => `msg_${nanoid(16)}`),
  chatId: text("chat_id")
    .references(() => chat.id, { onDelete: "cascade" })
    .notNull(),
  senderId: text("sender_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  replyToId: text("reply_to_id"),
  text: text("text"),
  source: text("source"),
  type: text("type", { enum: VALID_MESSAGE_TYPES }).notNull(),
  createdAt: timestamp("created_at").notNull(),
}, (m) => ({
  textIndex: index("text_index").on(m.text),
}));

export const contact = pgTable("contact", {
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  contactId: text("contact_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  alias: text("alias").notNull(),
  createdAt: timestamp("created_at").notNull(),
}, (c) => ({
  pk: primaryKey({ columns: [c.userId, c.contactId] }),
}));

export const block = pgTable("block", {
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  blockedUserId: text("blocked_user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull(),
}, (b) => ({
  pk: primaryKey({ columns: [b.userId, b.blockedUserId] }),
}));

export const emailVerificationCode = pgTable("email_verification_code", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `evc_${nanoid(16)}`),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  code: text("token")
    .notNull(),
  expires: timestamp("expires").notNull()
});

export const passwordResetToken = pgTable("password_reset_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `prtk_${nanoid(16)}`),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull()
});

// Media message info tables

export const imageInfo = pgTable("image_info", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `imginfo_${nanoid(16)}`),
  messageId: text("message_id")
    .references(() => message.id, { onDelete: "cascade" })
    .notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
});

export const videoInfo = pgTable("video_info", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `vidinfo_${nanoid(16)}`),
  messageId: text("message_id")
    .references(() => message.id, { onDelete: "cascade" })
    .notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  duration: integer("duration").notNull(),
});

export const linkPreview = pgTable("link_preview", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `lp_${nanoid(16)}`),
  messageId: text("message_id")
    .references(() => message.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title"),
  description: text("description"),
  image: text("image"),
  siteName: text("site_name"),
});

export const documentInfo = pgTable("document_info", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `docinfo_${nanoid(16)}`),
  messageId: text("message_id")
    .references(() => message.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  size: integer("size").notNull(),
});

export const audioInfo = pgTable("audio_info", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `audinfo_${nanoid(16)}`),
  messageId: text("message_id")
    .references(() => message.id, { onDelete: "cascade" })
    .notNull(),
  duration: integer("duration").notNull(),
  volumeSpikes: text("volume_spikes").notNull(),
});

// Auth tables (lucia)

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `u_${nanoid(12)}`)
    .notNull(),
  email: text("email")
    .unique()
    .notNull(),
  emailVerified: boolean("email_verified")
    .notNull(),
  name: text("name").notNull(),
  image: text("image"),
  status: text("status"),
  // Used for end-to-end encryption
  publicKey: text("public_key").notNull(),
  encryptedSecret: text("encrypted_secret").notNull(),
  // Used for authentication
  hashedPassword: text("hashed_password").notNull(),
});

export const session = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
