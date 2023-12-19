CREATE TABLE `link_preview` (
	`url` text PRIMARY KEY NOT NULL,
	`title` text,
	`description` text,
	`image` text,
	`site_name` text,
	`created_at` integer
);
