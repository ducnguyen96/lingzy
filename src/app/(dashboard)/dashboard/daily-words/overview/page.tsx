import EveryComponent from "@/components/dashboard/daily-words/every-component";
import Overview from "@/components/dashboard/daily-words/overview";
import { everyComp } from "@/config/overview";
import { getDailyWordsOverview } from "@/lib/server/queries/user/daily-words";
import { GraduationCap, Hourglass } from "lucide-react";

export default async function Page() {
  const overview = await getDailyWordsOverview();
  const baseUrl = "/dashboard/daily-words";

  return (
    <div className="h-full p-4 pt-0 justify-center items-center space-y-4">
      <Overview overview={overview} />
      <div className="p-6 gap-6 bg-primary/5 grid grid-cols-1 lg:grid-cols-2 rounded-3xl">
        <EveryComponent
          href={`${baseUrl}/list/everyday`}
          badge={<Hourglass size={14} />}
          color="orange-400"
          text="Waiting"
          value={overview.waiting}
        />
        {Object.entries(everyComp).map(([key, { title }], idx) => (
          <EveryComponent
            key={key}
            href={`${baseUrl}/list/${key}`}
            badge={<span>{idx + 1}</span>}
            color="purple-400"
            text={title}
            // @ts-expect-error valid key
            value={overview[key]}
          />
        ))}
        <EveryComponent
          href={`${baseUrl}/list/learned`}
          badge={<GraduationCap size={14} />}
          color="green-400"
          text="Learned"
          value={overview.learned}
        />
      </div>
    </div>
  );
}
