import { DrizzleError, eq } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { InsertWordListDTO, wordLists } from "../schemas";

export const insertWordList = async (dto: InsertWordListDTO) => {
  return db.insert(wordLists).values(dto).returning();
};

export const queryUserWordLists = async (user: DBUser) => {
  return db.query.wordLists.findMany({
    where: eq(wordLists.owner, user.id),
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

  if (found.translationIds.includes(translationId))
    throw new DrizzleError({ message: "WordList already included the word!" });
  await db
    .update(wordLists)
    .set({ translationIds: [...found.translationIds, translationId] })
    .where(eq(wordLists.id, wordListId));
};
