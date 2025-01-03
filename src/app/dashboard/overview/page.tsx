import Overview from "@/components/dashboard/daily-words/overview";
import { getDailyWordsOverview } from "@/lib/server/queries/user/daily-words";

export default async function Page() {
  const overview = await getDailyWordsOverview();
  return (
    <>
      <Overview overview={overview} />
    </>
  );
}
