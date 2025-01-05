import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { wordLists } from "../word-list/word-lists";
import { users } from "./users";

export const wordListScores = pgTable("word_list_scores", {
  id: serial("id").primaryKey(),
  spelling: text("spelling").notNull(),
  definition: text("definition").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  wordListId: integer("word_list_id").notNull(),
  userId: text("user_id").notNull(),
});

export const wordListScoresRelations = relations(wordListScores, ({ one }) => ({
  wordList: one(wordLists, {
    fields: [wordListScores.wordListId],
    references: [wordLists.id],
  }),
  user: one(users, {
    fields: [wordListScores.userId],
    references: [users.id],
  }),
}));
