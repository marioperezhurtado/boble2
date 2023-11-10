CREATE TABLE `block` (
	`user_id` text NOT NULL,
	`blocked_user_id` text NOT NULL,
	`created_at` integer,
	PRIMARY KEY(`blocked_user_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`blocked_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
