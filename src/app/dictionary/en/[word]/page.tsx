import { DictContent } from "@/components/dictionary/content";
import { read } from "@/lib/server/queries/dictionary/read";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<Awaited<ReturnType<typeof generateStaticParams>>[0]>;
};

export async function generateStaticParams() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/dictionary/en/mit-10.txt",
    "utf8",
  );

  const words = file.trim().split("\n");
  return words.map((word) => ({ word }));
}

export default async function Page({ params }: PageProps) {
  const { word } = await params;
  const details = await read({ word: decodeURIComponent(word), lang: "en" });
  if (!details) notFound();

  return <DictContent {...details} />;
}
