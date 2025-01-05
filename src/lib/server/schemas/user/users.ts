import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { settings } from "./settings";
import { accounts } from "./accounts";
import { dailyWords } from "./daily-words";
import { wordLists } from "../word-list/word-lists";
import { wordListScores } from "./word-list-scores";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image").notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  setting: one(settings),
  accounts: many(accounts),
  dailyWords: many(dailyWords),
  wordLists: many(wordLists),
  wordListScores: many(wordListScores),
}));

export type InsertUserDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof users>>
>;
