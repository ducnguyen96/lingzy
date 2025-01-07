import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { queryUserWordLists } from "../../services/word-list";

export const getMyWordLists = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  return queryUserWordLists(session.user);
};
