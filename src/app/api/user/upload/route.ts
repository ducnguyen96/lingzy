import { nanoid } from "nanoid";
import { NextResponse, type NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return new Response("Invalid input", { status: 400 });

  const nameSegments = file.name.split(".");
  const extension = nameSegments[nameSegments.length - 1];
  const newName = `${nanoid()}.${extension}`;

  // Define the path to save the file
  const savePath = path.join(process.cwd(), "public", "user", "photo", newName);

  // Ensure the directory exists
  await fs.mkdir(path.dirname(savePath), { recursive: true });

  // Save the file
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(savePath, buffer);

  return NextResponse.json({
    message: "File uploaded successfully",
    src: `/user/photo/${newName}`,
  });
}
