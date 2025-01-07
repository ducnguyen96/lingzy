import { asc, DrizzleError, eq } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { InsertWordListDTO, wordLists } from "../schemas";
import { TZDate } from "@date-fns/tz";

export type WordListEntity = NonNullable<Awaited<ReturnType<typeof queryById>>>;
export const queryById = async (id: number) => {
  return db.query.wordLists.findFirst({
    where: eq(wordLists.id, id),
    with: {
      owner: true,
      origin: true,
    },
  });
};

export const insertWordList = async (user: DBUser, dto: InsertWordListDTO) => {
  dto.origin = user.id;
  dto.owner = user.id;
  const ids = await db
    .insert(wordLists)
    .values(dto)
    .returning({ id: wordLists.id });
  return queryById(ids[0].id);
};

export const queryUserWordLists = async (user: DBUser) => {
  return db.query.wordLists.findMany({
    where: eq(wordLists.owner, user.id),
    orderBy: [asc(wordLists.createdAt)],
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
  if (found.owner != user.id)
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

export const removeWordFromWordList = async (
  user: DBUser,
  translationId: number,
  wordListId: number,
) => {
  const found = await db.query.wordLists.findFirst({
    where: eq(wordLists.id, wordListId),
  });
  if (!found) throw new DrizzleError({ message: "WordList not found!" });
  if (found.owner != user.id)
    throw new DrizzleError({ message: "WordList not yours!" });

  const now = new TZDate(new Date(), user.setting.currentTimezone);
  await db
    .update(wordLists)
    .set({
      translationIds: found.translationIds.filter((id) => id !== translationId),
      updatedAt: now,
    })
    .where(eq(wordLists.id, wordListId));
};
