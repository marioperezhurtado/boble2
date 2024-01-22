ALTER TABLE user ADD `public_key` text;--> statement-breakpoint
ALTER TABLE user ADD `encrypted_secret` text NOT NULL;