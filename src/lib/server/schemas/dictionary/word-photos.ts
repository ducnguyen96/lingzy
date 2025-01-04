import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { translations } from "./translations";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { subTranslations } from "./sub-translations";

export const wordPhotos = pgTable("word_photos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  photo: text("photo").notNull(),
  thumbnail: text("thumbnail").notNull(),
  translationId: integer("translation_id"),
  subTranslationId: integer("sub_translation_id"),
});

export const wordPhotoRelations = relations(wordPhotos, ({ one }) => ({
  translation: one(translations, {
    fields: [wordPhotos.translationId],
    references: [translations.id],
  }),
  subTranslation: one(subTranslations, {
    fields: [wordPhotos.subTranslationId],
    references: [subTranslations.id],
  }),
}));

const insertWordPhotoSchema = createInsertSchema(wordPhotos);
export type InsertWordPhotoDTO = z.infer<typeof insertWordPhotoSchema>;
