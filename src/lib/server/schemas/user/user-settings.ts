import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userSettings = pgTable("userSettings", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  theme: text("theme").notNull().default("system"),
  nativeLanguage: text("nativeLanguage").notNull().default("en"),
});

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const insertUserSettingSchema = createInsertSchema(userSettings);

export type InsertUserSettingDTO = z.infer<typeof insertUserSettingSchema>;
