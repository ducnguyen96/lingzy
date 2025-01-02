import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull().default("system"),
  learningLang: text("learning_lang").notNull().default("en"),
  nativeLanguage: text("native_language").notNull().default("en"),
  userId: text("user_id").notNull(),
});

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const insertUserSettingSchema = createInsertSchema(userSettings);

export type InsertUserSettingDTO = z.infer<typeof insertUserSettingSchema>;
