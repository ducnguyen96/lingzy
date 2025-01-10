import { getUserDailyWords } from "@/lib/server/queries/user/daily-words";
import IntervalsCarousel from "./components/intervals-carousel";
import WordslistTable from "./components/wordslist-table";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let filter: number | undefined;
  switch (slug) {
    case "all":
      filter = undefined;
      break;
    case "others":
      filter = 0;
      break;
    case "learned":
      filter = -1;
      break;
    default:
      filter = Number(slug.split("every")[1]);
  }
  const words = await getUserDailyWords(filter);
  return (
    <>
      <IntervalsCarousel />
      <WordslistTable words={words} />
    </>
  );
}
