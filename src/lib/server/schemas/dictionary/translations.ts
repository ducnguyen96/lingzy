import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod";
import { words } from "./words";
import { InsertWordPhotoDTO, wordPhotos } from "./word-photos";
import { InsertSubTranslationDTO, subTranslations } from "./sub-translations";
import { createInsertSchema } from "drizzle-zod";

export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  lang: text("lang").notNull(),
  translation: text("translation").notNull(),
  synonyms: text("synonyms")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  antonyms: text("antonyms")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  examples: text("examples")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  level: text("level"),
  title: text("title").notNull(),
  type: text("type").notNull(),
  wordId: integer("word_id").notNull(),
});

export const translationRelations = relations(
  translations,
  ({ one, many }) => ({
    word: one(words, {
      fields: [translations.wordId],
      references: [words.id],
    }),
    wordPhoto: one(wordPhotos),
    subTranslations: many(subTranslations),
  }),
);

export type InsertTranslationDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof translations>>
> & {
  wordPhoto?: InsertWordPhotoDTO;
  subTranslations: InsertSubTranslationDTO[];
};
