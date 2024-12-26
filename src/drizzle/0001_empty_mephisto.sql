CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "userAccounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "userAccounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "userSettings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"theme" text DEFAULT 'system' NOT NULL,
	"nativeLanguage" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userCards" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"wordId" integer NOT NULL,
	"interval" smallint NOT NULL,
	"repetition" smallint NOT NULL,
	"ef" real NOT NULL,
	"nextReview" date NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
