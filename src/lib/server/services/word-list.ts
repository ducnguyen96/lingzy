import { asc, DrizzleError, eq, inArray } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { InsertWordListDTO, translations, wordLists } from "../schemas";
import { TZDate } from "@date-fns/tz";

export type WordListEntity = NonNullable<Awaited<ReturnType<typeof queryById>>>;
export type WordListWithTranslations = NonNullable<
  Awaited<ReturnType<typeof queryDetailsById>>
>;

export const queryById = async (id: number) => {
  return db.query.wordLists.findFirst({
    where: eq(wordLists.id, id),
    with: {
      owner: true,
      origin: true,
    },
  });
};

export const queryDetailsById = async (id: number) => {
  const found = await db.query.wordLists.findFirst({
    where: eq(wordLists.id, id),
    with: {
      owner: true,
      origin: true,
    },
  });
  if (!found) return found;

  const trans = await db.query.translations.findMany({
    where: inArray(translations.id, found.translationIds),
    with: {
      wordPhoto: true,
      word: true,
    },
  });

  return { wordList: found, translations: trans };
};

export const insertWordList = async (user: DBUser, dto: InsertWordListDTO) => {
  dto.originId = user.id;
  dto.ownerId = user.id;
  const ids = await db
    .insert(wordLists)
    .values(dto)
    .returning({ id: wordLists.id });
  return queryById(ids[0].id);
};

export const queryUserWordlists = async (user: DBUser) => {
  return db.query.wordLists.findMany({
    where: eq(wordLists.ownerId, user.id),
    orderBy: [asc(wordLists.createdAt)],
    with: {
      owner: true,
      origin: true,
    },
  });
};

export const insertWordToWordList = async (
  user: DBUser,
  translationId: number,
  wordListId: number,
) => {
  const found = await db.query.wordLists.findFirst({
    where: eq(wordLists.id, wordListId),
  });
  if (!found) throw new DrizzleError({ message: "WordList not found!" });
  if (found.ownerId != user.id)
    throw new DrizzleError({ message: "WordList not yours!" });

  const now = new TZDate(new Date(), user.setting.currentTimezone);
  await db
    .update(wordLists)
    .set({
      translationIds: [...found.translationIds, translationId],
      updatedAt: now,
    })
    .where(eq(wordLists.id, wordListId));
};

export const deleteWordFromWordlist = async (
  user: DBUser,
  translationId: number,
  wordlistId: number,
) => {
  const found = await db.query.wordLists.findFirst({
    where: eq(wordLists.id, wordlistId),
  });
  if (!found) throw new DrizzleError({ message: "WordList not found!" });
  if (found.ownerId != user.id)
    throw new DrizzleError({ message: "WordList not yours!" });

  const now = new TZDate(new Date(), user.setting.currentTimezone);
  await db
    .update(wordLists)
    .set({
      translationIds: found.translationIds.filter((id) => id !== translationId),
      updatedAt: now,
    })
    .where(eq(wordLists.id, wordlistId));
};
