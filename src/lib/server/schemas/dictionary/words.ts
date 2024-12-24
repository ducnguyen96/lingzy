import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { InsertTranslationDTO, translations } from "./translations";
import { InsertPronunciationDTO, pronunciations } from "./pronunciations";
import { z } from "zod";

export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  lang: text("lang").notNull(),
  nearByWords: text("near_by_words")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});

export const wordsRelations = relations(words, ({ many }) => ({
  pronunciations: many(pronunciations),
  translations: many(translations),
}));

export const insertWordSchema = createInsertSchema(words);
export type InsertWordDTO = z.infer<typeof insertWordSchema> & {
  pronunciations: InsertPronunciationDTO[];
  translations: InsertTranslationDTO[];
};
