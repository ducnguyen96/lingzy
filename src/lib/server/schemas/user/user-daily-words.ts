import { relations } from "drizzle-orm";
import {
  date,
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

export const userDailyWords = pgTable("user_daily_words", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  lang: text("lang").notNull(),
  translationId: integer("translation_id").notNull(),
  interval: smallint("interval").notNull(),
  repetition: smallint("repetition").notNull(),
  ef: real().notNull(),
  nextReview: date("next_review").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  completedAt: timestamp("completed_at"),
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
