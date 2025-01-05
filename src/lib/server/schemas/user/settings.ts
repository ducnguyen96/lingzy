import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull().default("system"),
  learningLang: text("learning_lang").notNull().default("en"),
  nativeLanguage: text("native_language").notNull().default("en"),
  currentTimezone: text("current_timezone")
    .notNull()
    .default("Asia/Ho_Chi_Minh"),
  userId: text("user_id").notNull(),
});

export const settingsRelations = relations(settings, ({ one }) => ({
  user: one(users, {
    fields: [settings.userId],
    references: [users.id],
  }),
}));

export type InsertUserSettingDTO = z.infer<
  ReturnType<typeof createInsertSchema<typeof settings>>
>;
export type UpdateUserSettingDTO = z.infer<
  ReturnType<typeof createUpdateSchema<typeof settings>>
>;
