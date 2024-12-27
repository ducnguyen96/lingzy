import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userWordLists } from "./user-word-lists";

export const wordListScores = pgTable("word_list_scores", {
  id: serial("id").primaryKey(),
  spelling: text("spelling").notNull(),
  definition: text("definition").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  wordListId: text("word_list_id").notNull(),
});

export const wordListScoresRelations = relations(wordListScores, ({ one }) => ({
  wordList: one(userWordLists, {
    fields: [wordListScores.wordListId],
    references: [userWordLists.id],
  }),
}));
