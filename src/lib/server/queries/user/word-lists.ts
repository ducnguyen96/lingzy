import { auth } from "@/auth";
import { forbidden, notFound, unauthorized } from "next/navigation";
import { queryDetailsById, queryUserWordlists } from "../../services/word-list";

export const getById = async (id: number) => {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  const found = await queryDetailsById(id);
  if (!found) notFound();

  const { wordList } = found;

  if (wordList.ownerId != session.user.id && wordList.visibility !== "public")
    forbidden();

  return found;
};

export const getMyWordlists = async () => {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  return queryUserWordlists(session.user);
};
