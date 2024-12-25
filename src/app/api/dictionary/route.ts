import { fullTextSearch } from "@/lib/server/services/dictionary";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const s = searchParams.get("s") || "";
  const lang = searchParams.get("lang") || "en";
  const found = await fullTextSearch(s, lang);
  return NextResponse.json({ message: "Fetched successfully", data: found });
}
