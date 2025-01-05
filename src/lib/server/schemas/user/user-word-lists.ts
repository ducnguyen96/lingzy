import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { wordListScores } from "./user-word-list-scores";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userWordLists = pgTable("user_word_lists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  state: text("state").notNull().default("pending"),
  description: text("description"),
  translationIds: integer("translation_ids")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
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

export type InsertUserWordListDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof userWordLists>>
>;
