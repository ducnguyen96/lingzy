import { auth } from "@/auth";
import { queryTodayWords } from "@/lib/server/services/daily-word";
import { unauthorized } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  const searchParams = req.nextUrl.searchParams;
  const count = searchParams.get("count");

  const data = await queryTodayWords(session.user);
  return NextResponse.json({
    message: "Fetched successfully",
    data: count ? data.length : data,
  });
}
