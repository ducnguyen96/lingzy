import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { words } from "./words";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pronunciations = pgTable("pronunciations", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  phonetic: text("phonetic").notNull(),
  audio: text("audio").notNull(),
  wordId: integer("word_id").notNull(),
});

export const pronunciationsRelations = relations(pronunciations, ({ one }) => ({
  word: one(words, {
    fields: [pronunciations.wordId],
    references: [words.id],
  }),
}));

const insertPronunciationSchema = createInsertSchema(pronunciations);
export type InsertPronunciationDTO = z.infer<typeof insertPronunciationSchema>;
