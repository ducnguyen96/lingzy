import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { queryDailyWordsOverview } from "../../services/daily-word";

export const getDailyWordsOverview = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  return queryDailyWordsOverview(session.user);
};
