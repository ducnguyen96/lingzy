import { auth } from "@/auth";
import { UpdateUserSettingDTO } from "@/lib/server/schemas";
import { updateUserSetting } from "@/lib/server/services/user";
import { unauthorized } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) unauthorized();

  const body = (await req.json()) as UpdateUserSettingDTO;
  await updateUserSetting(session.user, body);

  return NextResponse.json({
    message: "Fetched successfully",
    data: {},
  });
}
