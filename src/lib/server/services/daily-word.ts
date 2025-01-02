import { and, DrizzleError, eq, lte } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { translations, userDailyWords } from "../schemas";

export type TodayWordEntity = Awaited<ReturnType<typeof queryTodayWords>>[0];
export type DailyWordsOverview = {
  waiting: number;
  learning: number;
  learned: number;
  progress: {
    total: number;
    details: Record<string, number>;
  };
  every1: number;
  every2: number;
  every4: number;
  every8: number;
  every16: number;
  every32: number;
};

export const insertToDailyWords = async (
  user: DBUser,
  translationId: number,
) => {
  await db.transaction(async (tx) => {
    const found = await tx.query.userDailyWords.findFirst({
      where: and(
        eq(userDailyWords.translationId, translationId),
        eq(userDailyWords.userId, user.id),
      ),
    });
    if (found) return;

    const translation = await tx.query.translations.findFirst({
      where: eq(translations.id, translationId),
    });
    if (!translation)
      throw new DrizzleError({ message: "Translation not found" })!;

    await tx.insert(userDailyWords).values({
      userId: user.id,
      lang: translation.lang,
      translationId: translationId,
      interval: 1,
      repetition: 0,
      ef: 2.5,
      nextReview: new Date().toISOString(),
    });
  });
};

export const queryDailyWordsOverview = async (user: DBUser) => {
  const found = await db.query.userDailyWords.findMany({
    where: and(
      eq(userDailyWords.userId, user.id),
      eq(userDailyWords.lang, user.setting.learningLang),
    ),
  });

  const overview: DailyWordsOverview = {
    waiting: 0,
    learning: 0,
    learned: 0,
    progress: {
      total: 0,
      details: {},
    },
    every1: 0,
    every2: 0,
    every4: 0,
    every8: 0,
    every16: 0,
    every32: 0,
  };

  for (let i = 0; i < found.length; i++) {
    const word = found[i];
    if (!word.updatedAt) {
      overview.waiting += 1;
      continue;
    }

    if (word.completedAt) {
      overview.learned += 1;
      const date = word.completedAt.toISOString().slice(0, 10);
      if (overview.progress.details[date]) {
        overview.progress.details[date] += 1;
        continue;
      }
      overview.progress.details[date] = 1;
    }

    switch (word.interval) {
      case 1:
        overview.every1 += 1;
        break;
      case 2:
        overview.every2 += 1;
        break;
      case 4:
        overview.every4 += 1;
        break;
      case 8:
        overview.every8 += 1;
        break;
      case 16:
        overview.every16 += 1;
        break;
      case 32:
        overview.every32 += 1;
        break;
    }
  }

  return overview;
};

export const queryTodayWords = async (user: DBUser) => {
  return db.query.userDailyWords.findMany({
    where: and(
      eq(userDailyWords.userId, user.id),
      lte(userDailyWords.nextReview, new Date().toISOString()),
    ),
    with: {
      word: {
        with: {
          word: {
            with: {
              pronunciations: true,
            },
          },
        },
      },
    },
  });
};
