import { auth } from "@/auth";
import { InsertWordListDTO } from "@/lib/server/schemas";
import { insertToDailyWords } from "@/lib/server/services/daily-word";
import {
  insertWordList,
  insertWordToWordList,
  queryUserWordLists,
  removeWordFromWordList,
} from "@/lib/server/services/word-list";
import { unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  const data = await queryUserWordLists(session.user);
  return NextResponse.json({
    message: "Fetched successfully",
    data: data,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  const body = (await req.json()) as InsertWordListDTO;

  const data = await insertWordList(session.user, body);

  return NextResponse.json({
    message: "Add new WordList successfully",
    data: data,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  const body = (await req.json()) as {
    old: number[];
    new: number[];
    translationId: number;
  };

  const { old, new: newIds } = body;

  const added = newIds.filter((id) => {
    if (old.includes(id)) return true;
    return insertWordToWordList(session.user!, body.translationId, id);
  });

  const removed = old.filter((id) => {
    if (newIds.includes(id)) return true;
    return removeWordFromWordList(session.user!, body.translationId, id);
  });

  await Promise.all([...added, ...removed]);

  return NextResponse.json({
    message: "Update WordList successfully",
    data: {},
  });
}
