import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { userSettings } from "./user-settings";
import { userAccounts } from "./user-accounts";
import { userDailyWords } from "./user-daily-words";
import { userWordLists } from "./user-word-lists";

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
  setting: one(userSettings),
  accounts: many(userAccounts),
  dailyWords: many(userDailyWords),
  wordLists: many(userWordLists),
}));

export type InsertUserDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof users>>
>;
