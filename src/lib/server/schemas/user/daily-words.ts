import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  real,
  serial,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { translations } from "../dictionary/translations";
import { createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const dailyWords = pgTable("daily_words", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  lang: text("lang").notNull(),
  translationId: integer("translation_id").notNull(),
  interval: smallint("interval").notNull(),
  repetition: smallint("repetition").notNull(),
  ef: real().notNull(),
  nextReview: timestamp("next_review", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const dailyWordsRelations = relations(dailyWords, ({ one }) => ({
  user: one(users, {
    fields: [dailyWords.userId],
    references: [users.id],
  }),
  word: one(translations, {
    fields: [dailyWords.translationId],
    references: [translations.id],
  }),
}));

export type UpdateDailyWordDTO = z.infer<
  ReturnType<typeof createUpdateSchema<typeof dailyWords>>
>;
