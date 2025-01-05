import { DrizzleError, eq } from "drizzle-orm";
import db from "../db";
import { InsertUserWordListDTO, userWordLists } from "../schemas";
import { DBUser } from "./user";

export const addWordList = async (dto: InsertUserWordListDTO) => {
  return db.insert(userWordLists).values(dto).returning();
};

export const getWordLists = async (user: DBUser) => {
  return db.query.userWordLists.findMany({
    where: eq(userWordLists.userId, user.id),
  });
};

export const addToWordList = async (
  user: DBUser,
  translationId: number,
  wordListId: number,
) => {
  const found = await db.query.userWordLists.findFirst({
    where: eq(userWordLists.id, wordListId),
  });
  if (!found) throw new DrizzleError({ message: "WordList not found !" });
  if (found.userId != user.id)
    throw new DrizzleError({ message: "WordList not yours !" });

  if (found.translationIds.includes(translationId))
    throw new DrizzleError({ message: "WordList already included the word" });
  await db
    .update(userWordLists)
    .set({ translationIds: [...found.translationIds, translationId] })
    .where(eq(userWordLists.userId, user.id));
};
