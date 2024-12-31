import { auth } from "@/auth";
import { getTodayWords } from "@/lib/server/services/daily-word";
import { unauthorized } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) unauthorized();
  const searchParams = req.nextUrl.searchParams;
  const count = searchParams.get("count");

  const data = await getTodayWords(session.user.id);
  return NextResponse.json({
    message: "Fetched successfully",
    data: count ? data.length : data,
  });
}
