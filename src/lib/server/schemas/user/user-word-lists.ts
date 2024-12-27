import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { wordListScores } from "./user-word-list-scores";

export const userWordLists = pgTable("user_word_lists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  state: text("state").notNull(),
  description: text("description"),
  translationIds: text("translation_ids")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  userId: text("user_id").notNull(),
});

export const userWordListsRelations = relations(
  userWordLists,
  ({ one, many }) => ({
    user: one(users, {
      fields: [userWordLists.userId],
      references: [users.id],
    }),
    scores: many(wordListScores),
  }),
);
