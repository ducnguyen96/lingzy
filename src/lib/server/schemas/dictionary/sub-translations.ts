import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { InsertWordPhotoDTO, wordPhotos } from "./word-photos";
import { translations } from "./translations";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subTranslations = pgTable("sub_translations", {
  id: serial("id").primaryKey(),
  translation: text("translation").notNull(),
  examples: text("examples")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  level: text("level"),
  parentId: integer("parent_id").notNull(),
});

export const subTranslationRelations = relations(
  subTranslations,
  ({ one }) => ({
    parent: one(translations, {
      fields: [subTranslations.parentId],
      references: [translations.id],
    }),
    wordPhoto: one(wordPhotos),
  }),
);

const insertSubTranslationSchema = createInsertSchema(subTranslations);
export type InsertSubTranslationDTO = z.infer<
  typeof insertSubTranslationSchema
> & {
  wordPhoto?: InsertWordPhotoDTO;
};
