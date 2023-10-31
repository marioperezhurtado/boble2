CREATE TABLE `chat` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` text PRIMARY KEY NOT NULL,
	`chat_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`text` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `participant` (
	`chat_id` text NOT NULL,
	`user_id` text NOT NULL,
	`joined_at` integer DEFAULT CURRENT_TIMESTAMP,
	`last_read_at` integer DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`chat_id`, `user_id`),
	FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);