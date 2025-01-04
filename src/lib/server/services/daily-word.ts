import { and, DrizzleError, eq, gte, isNull, lt } from "drizzle-orm";
import db from "../db";
import { DBUser } from "./user";
import { translations, UpdateDailyWordDTO, userDailyWords } from "../schemas";
import { TZDate } from "@date-fns/tz";
import {
  add,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  sub,
} from "date-fns";

export type TodayWordEntity = Awaited<ReturnType<typeof queryTodayWords>>[0];
export type DailyWordsOverview = {
  waiting: number;
  learning: number;
  learned: number;
  sevDays: { day: string; learned: number; new: number }[];
  every1: number;
  every2: number;
  every4: number;
  every8: number;
  every16: number;
  every32: number;
  others: number;
};

export const insertToDailyWords = async (
  user: DBUser,
  translationId: number,
) => {
  const now = new TZDate(new Date(), user.setting.currentTimezone);
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
      nextReview: startOfDay(now),
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
    sevDays: [],
    every1: 0,
    every2: 0,
    every4: 0,
    every8: 0,
    every16: 0,
    every32: 0,
    others: 0,
  };
  const now = new TZDate(new Date(), user.setting.currentTimezone);
  const sixDaysAgo = startOfDay(sub(now, { days: 6 }));
  const nameToIndex: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const date = sub(now, { days: i });
    const dayName = format(date, "EEE");
    nameToIndex[dayName] = 6 - i;
    overview.sevDays.push({ day: dayName, learned: 0, new: 0 });
  }

  for (let i = 0; i < found.length; i++) {
    const word = found[i];
    if (word.completedAt) {
      overview.learned += 1;

      const completedAt = new TZDate(word.completedAt);
      if (isBefore(completedAt, sixDaysAgo)) continue;

      const dayIndx = nameToIndex[format(completedAt, "EEE")];
      overview.sevDays[dayIndx].learned += 1;
      continue;
    }

    const createdAt = new TZDate(word.createdAt);
    if (isAfter(createdAt, sixDaysAgo)) {
      const dayIndx = nameToIndex[format(createdAt, "EEE")];
      overview.sevDays[dayIndx].new += 1;
    }

    if (!word.updatedAt) {
      overview.waiting += 1;
      continue;
    }

    overview.learning += 1;
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
      default:
        overview.others += 1;
    }
  }

  return overview;
};

export const queryTodayWords = async (user: DBUser) => {
  const now = new TZDate(new Date(), user.setting.currentTimezone);
  return db.query.userDailyWords.findMany({
    where: and(
      eq(userDailyWords.userId, user.id),
      lt(userDailyWords.nextReview, endOfDay(now)),
      gte(userDailyWords.nextReview, startOfDay(now)),
      isNull(userDailyWords.completedAt),
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
    limit: 10,
  });
};

export const patchTodayWord = async (
  user: DBUser,
  id: number,
  rating: 1 | 3 | 5,
) => {
  const now = new TZDate(new Date(), user.setting.currentTimezone);
  await db.transaction(async (tx) => {
    const found = await tx.query.userDailyWords.findFirst({
      where: and(eq(userDailyWords.id, id), eq(userDailyWords.userId, user.id)),
    });
    if (!found) throw new DrizzleError({ message: "not found" });

    const dto: UpdateDailyWordDTO = {};

    if (rating === 1) {
      dto.interval = 1;
      dto.ef = Math.max(1.3, found.ef - 0.2);
      dto.repetition = 0;
    } else if (rating === 3) {
      dto.ef = Math.max(1.3, found.ef - 0.1);
      dto.interval = Math.round(found.interval * dto.ef);
      dto.repetition = found.repetition + 1;
    } else {
      dto.ef = found.ef + 0.1;
      dto.interval = Math.round(found.interval * dto.ef);
      dto.repetition = found.repetition + 1;
    }
    dto.nextReview = startOfDay(add(now, { days: dto.interval }));
    dto.updatedAt = now;

    if (dto.repetition >= 3 && dto.interval >= 30 && dto.ef >= 3.0) {
      dto.completedAt = now;
    }

    await tx.update(userDailyWords).set(dto).where(eq(userDailyWords.id, id));
  });
};
