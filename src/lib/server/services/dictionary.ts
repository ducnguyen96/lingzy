import { and, eq, ExtractTablesWithRelations, sql } from "drizzle-orm";
import {
  InsertPronunciationDTO,
  InsertSubTranslationDTO,
  InsertTranslationDTO,
  InsertWordDTO,
  pronunciations,
  subTranslations,
  translations,
  wordPhotos,
  words,
} from "../schemas";
import db from "../db";
import { PgTransaction } from "drizzle-orm/pg-core";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";

export type FindDTO = {
  lang: string;
  word: string;
};

export type WordEntity = NonNullable<Awaited<ReturnType<typeof findFirst>>>;
export type TranslationEntity = NonNullable<
  Awaited<ReturnType<typeof findFirst>>
>["translations"][0];
export type PronunciationEntity = NonNullable<
  Awaited<ReturnType<typeof findFirst>>
>["pronunciations"][0];
export type WordPhotoEntity = NonNullable<
  Awaited<ReturnType<typeof findFirst>>
>["translations"][0]["wordPhoto"];

type Tx = PgTransaction<
  NodePgQueryResultHKT,
  typeof import("../schemas"),
  ExtractTablesWithRelations<typeof import("../schemas")>
>;

const insertSubTranslationsTx = async (
  translationId: number,
  dtos: InsertSubTranslationDTO[],
  tx: Tx,
) => {
  const ids = await tx
    .insert(subTranslations)
    .values(dtos.map((dto) => ({ ...dto, parentId: translationId })))
    .returning({ sTi: subTranslations.id });

  return Promise.all(
    ids.map((id, idx) => {
      if (!dtos[idx].wordPhoto) return true;
      return tx
        .insert(wordPhotos)
        .values({ ...dtos[idx].wordPhoto, subTranslationId: id.sTi });
    }),
  );
};

const insertTranslationsTx = async (
  wordId: number,
  dtos: InsertTranslationDTO[],
  tx: Tx,
) => {
  const ids = await tx
    .insert(translations)
    .values(dtos.map((dto) => ({ ...dto, wordId })))
    .returning({ tId: translations.id });

  return Promise.all(
    ids.map(async (id, idx) => {
      if (dtos[idx].wordPhoto) {
        await tx
          .insert(wordPhotos)
          .values({ ...dtos[idx].wordPhoto, translationId: id.tId });
      }

      if (dtos[idx].subTranslations.length) {
        await insertSubTranslationsTx(id.tId, dtos[idx].subTranslations, tx);
      }
    }),
  );
};

const insertPronunciationsTx = async (
  wordId: number,
  dtos: InsertPronunciationDTO[],
  tx: Tx,
) => tx.insert(pronunciations).values(dtos.map((dto) => ({ ...dto, wordId })));

export const insertOne = async (dto: InsertWordDTO) => {
  const { translations, pronunciations, ...word } = dto;
  await db.transaction(async (tx) => {
    const ids = await tx
      .insert(words)
      .values(word)
      .returning({ wordId: words.id });

    if (translations.length) {
      await insertTranslationsTx(ids[0].wordId, translations, tx);
    }

    if (pronunciations.length) {
      await insertPronunciationsTx(ids[0].wordId, pronunciations, tx);
    }
  });
};

export const findFirst = async ({ word, lang }: FindDTO) => {
  return db.query.words.findFirst({
    where: and(...[eq(words.lang, lang), eq(words.word, word)]),
    with: {
      translations: {
        with: {
          wordPhoto: true,
          subTranslations: {
            with: {
              wordPhoto: true,
            },
          },
        },
      },
      pronunciations: {
        limit: 2,
      },
    },
  });
};

export const fullTextSearch = async (s: string, lang: string) => {
  return db.query.words.findMany({
    where: and(
      ...[
        eq(words.lang, lang),
        sql`to_tsvector('english', ${words.word}) @@ to_tsquery('english', ${s})`,
      ],
    ),
    with: {
      translations: {
        with: {
          wordPhoto: true,
          subTranslations: {
            with: {
              wordPhoto: true,
            },
          },
        },
      },
      pronunciations: true,
    },
  });
};
