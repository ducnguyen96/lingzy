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
