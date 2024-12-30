"use server";

import * as services from "../../services/daily-word";

import { auth } from "@/auth";
import { unauthorized } from "next/navigation";

export const addToDailyWords = async (translationId: number) => {
  const session = await auth();
  if (!session) unauthorized();
  await services.addToDailyWords(session.user, translationId);
  return { message: "Word is added to DailyWords successfully !", data: {} };
};
