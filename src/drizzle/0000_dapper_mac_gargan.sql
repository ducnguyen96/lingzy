CREATE TABLE "pronunciations" (
	"id" serial PRIMARY KEY NOT NULL,
	"country" text NOT NULL,
	"phonetic" text NOT NULL,
	"audio" text NOT NULL,
	"word_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"translation" text NOT NULL,
	"examples" text[] DEFAULT '{}'::text[] NOT NULL,
	"level" text,
	"parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"lang" text NOT NULL,
	"translation" text NOT NULL,
	"synonyms" text[] DEFAULT '{}'::text[] NOT NULL,
	"antonyms" text[] DEFAULT '{}'::text[] NOT NULL,
	"examples" text[] DEFAULT '{}'::text[] NOT NULL,
	"level" text,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"word_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "word_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"photo" text NOT NULL,
	"thumbnail" text NOT NULL,
	"translation_id" integer,
	"sub_translation_id" integer
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"lang" text NOT NULL,
	"near_by_words" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "daily_words" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lang" text NOT NULL,
	"translation_id" integer NOT NULL,
	"interval" smallint NOT NULL,
	"repetition" smallint NOT NULL,
	"ef" real NOT NULL,
	"next_review" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"theme" text DEFAULT 'system' NOT NULL,
	"learning_lang" text DEFAULT 'en' NOT NULL,
	"native_language" text DEFAULT 'en' NOT NULL,
	"current_timezone" text DEFAULT 'Asia/Ho_Chi_Minh' NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "word_list_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"spelling" text NOT NULL,
	"definition" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"word_list_id" integer NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "word_lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"state" text DEFAULT 'pending' NOT NULL,
	"description" text,
	"translation_ids" integer[] DEFAULT '{}'::integer[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"origin" text NOT NULL,
	"owner" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "word_idx" ON "words" USING btree ("word");