import { DictContent } from "@/components/dictionary/content";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import { findFirst } from "@/lib/server/services/dictionary";
import { scrape } from "@/lib/server/mutations/dictionary/scrape";

type PageProps = {
  params: Promise<Awaited<ReturnType<typeof generateStaticParams>>[0]>;
};

export async function generateStaticParams() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/(main)/dictionary/en/mit-10k.txt",
    "utf8",
  );

  const words = file.trim().split("\n");
  return words.map((word) => ({ word }));
}

export default async function Page({ params }: PageProps) {
  const { word } = await params;
  let details = await findFirst("en", decodeURIComponent(word));
  if (!details) {
    await scrape("en", word);
    details = await findFirst("en", decodeURIComponent(word));
  }

  if (!details) notFound();

  return <DictContent {...details} />;
}
