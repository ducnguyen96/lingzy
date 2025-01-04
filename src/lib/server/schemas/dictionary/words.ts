import { relations, sql } from "drizzle-orm";
import { index, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { InsertTranslationDTO, translations } from "./translations";
import { InsertPronunciationDTO, pronunciations } from "./pronunciations";
import { z } from "zod";

export const words = pgTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    lang: text("lang").notNull(),
    nearByWords: text("near_by_words")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
  },
  (table) => ({
    wordIdx: index("word_idx").on(table.word),
  }),
);

export const wordsRelations = relations(words, ({ many }) => ({
  pronunciations: many(pronunciations),
  translations: many(translations),
}));

const insertWordSchema = createInsertSchema(words);
export type InsertWordDTO = z.infer<typeof insertWordSchema> & {
  pronunciations: InsertPronunciationDTO[];
  translations: InsertTranslationDTO[];
};
