import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import {
  queryDailyWordsOverview,
  queryTodayWords,
} from "../../services/daily-word";

export const getDailyWordsOverview = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  return queryDailyWordsOverview(session.user);
};

export const getTodayWords = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  return queryTodayWords(session.user);
};
