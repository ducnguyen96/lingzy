import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { queryUserWordlists } from "../../services/word-list";

export const getMyWordlists = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  return queryUserWordlists(session.user);
};
