"use server";

import { auth } from "@/auth";
import { notFound, unauthorized } from "next/navigation";
import {
  deleteWordFromWordlist,
  queryById,
  updateWordList,
} from "../../services/word-list";
import { TZDate } from "@date-fns/tz";

export const removeWordFromWordlist = async (
  translationId: number,
  wordlistId: number,
) => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  await deleteWordFromWordlist(session.user, translationId, wordlistId);
};

export const toggleVisibility = async (id: number) => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  const found = await queryById(id);
  if (!found) notFound();
  if (found.ownerId !== session.user.id) unauthorized();

  const visibility = found.visibility === "public" ? "private" : "public";
  await updateWordList(id, {
    visibility,
    updatedAt: new TZDate(new Date(), session.user.setting.currentTimezone),
  });
};
