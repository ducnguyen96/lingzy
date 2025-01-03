import MyCarousel from "@/components/carousel/my-carousel";
import { getTodayWords } from "@/lib/server/queries/user/daily-words";

export default async function Page() {
  const todayWords = await getTodayWords();
  return <MyCarousel todayWords={todayWords} />;
}
