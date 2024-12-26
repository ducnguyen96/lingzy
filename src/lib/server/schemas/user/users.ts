import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userCards } from "./user-cards";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { userSettings } from "./user-settings";
import { userAccounts } from "./user-accounts";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image").notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  cards: many(userCards),
  setting: one(userSettings),
  accounts: many(userAccounts),
}));

export const insertUserSchema = createInsertSchema(users);

export type InsertUserDTO = z.infer<typeof insertUserSchema>;
