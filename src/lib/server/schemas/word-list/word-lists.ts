import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../user/users";
import { wordListScores } from "../user/word-list-scores";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wordLists = pgTable("word_lists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  visibility: text("visibility").notNull().default("private"),
  translationIds: integer("translation_ids")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  originId: text("origin").notNull(),
  ownerId: text("owner").notNull(),
});

export const wordListsRelations = relations(wordLists, ({ one, many }) => ({
  origin: one(users, {
    fields: [wordLists.originId],
    references: [users.id],
  }),
  owner: one(users, {
    fields: [wordLists.ownerId],
    references: [users.id],
  }),
  scores: many(wordListScores),
}));

export type InsertWordListDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof wordLists>>
>;
