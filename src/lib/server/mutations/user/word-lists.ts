"use server";

import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { deleteWordFromWordlist } from "../../services/word-list";

export const removeWordFromWordlist = async (
  translationId: number,
  wordlistId: number,
) => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  await deleteWordFromWordlist(session.user, translationId, wordlistId);
};
