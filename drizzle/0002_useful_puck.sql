ALTER TABLE `user` RENAME COLUMN `public_key` TO `publicKey`;--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `encrypted_secret` TO `encryptedSecret`;--> statement-breakpoint
/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE link_preview ADD `message_id` text PRIMARY KEY NOT NULL REFERENCES message(id);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `audio_info` DROP COLUMN `url`;--> statement-breakpoint
ALTER TABLE `audio_info` DROP COLUMN `transcript`;--> statement-breakpoint
ALTER TABLE `document_info` DROP COLUMN `url`;--> statement-breakpoint
ALTER TABLE `link_preview` DROP COLUMN `url`;--> statement-breakpoint
ALTER TABLE `link_preview` DROP COLUMN `created_at`;