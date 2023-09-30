DO $$ BEGIN
 CREATE TYPE "file_type" AS ENUM('IMAGE', 'VIDEO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" varchar NOT NULL,
	"type" "file_type" NOT NULL,
	"file_name" varchar NOT NULL,
	"thumbnail_file_name" varchar,
	"is_favorite" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "files_hash_unique" UNIQUE("hash")
);
