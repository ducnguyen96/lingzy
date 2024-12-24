import { promises as fs } from "fs";

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

  return <p>{word}</p>;
}
