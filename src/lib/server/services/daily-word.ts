import { and, eq } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { userDailyWords } from "../schemas";

export const addToDailyWords = async (user: DBUser, translationId: number) => {
  await db.transaction(async (tx) => {
    const found = await tx.query.userDailyWords.findFirst({
      where: and(
        ...[
          eq(userDailyWords.translationId, translationId),
          eq(userDailyWords.userId, user.id),
        ],
      ),
    });
    if (!found) return;

    await tx.insert(userDailyWords).values({
      userId: user.id,
      translationId: translationId,
      interval: 1,
      repetition: 0,
      ef: 2.5,
      nextReview: new Date().toISOString(),
    });
  });
};
