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
import { words } from "../dictionary/words";

export const userCards = pgTable("userCards", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  wordId: integer("wordId").notNull(),
  interval: smallint("interval").notNull(),
  repetition: smallint("repetition").notNull(),
  ef: real().notNull(),
  nextReview: date("nextReview").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const userCardsRelations = relations(userCards, ({ one }) => ({
  user: one(users, {
    fields: [userCards.userId],
    references: [users.id],
  }),
  word: one(words, {
    fields: [userCards.wordId],
    references: [words.id],
  }),
}));
