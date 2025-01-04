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

export const userDailyWords = pgTable("user_daily_words", {
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

export const userDailyWordsRelations = relations(userDailyWords, ({ one }) => ({
  user: one(users, {
    fields: [userDailyWords.userId],
    references: [users.id],
  }),
  word: one(translations, {
    fields: [userDailyWords.translationId],
    references: [translations.id],
  }),
}));

const updateDailyWordSchema = createUpdateSchema(userDailyWords);
export type UpdateDailyWordDTO = z.infer<typeof updateDailyWordSchema>;
