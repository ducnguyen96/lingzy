import EveryComponent from "@/components/dashboard/daily-words/every-component";
import Overview from "@/components/dashboard/daily-words/overview";
import { Button } from "@/components/ui/button";
import { everyComp } from "@/config/overview";
import { getDailyWordsOverview } from "@/lib/server/queries/user/daily-words";
import { BrainCircuit, GraduationCap, Hourglass } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const overview = await getDailyWordsOverview();
  const baseUrl = "/dashboard/daily-words";

  return (
    <div className="h-full justify-center items-center lg:p-4 space-y-4">
      <Link prefetch={false} href={`/flashcard/daily-words`}>
        <Button variant="ghost" className="bg-primary/5">
          <BrainCircuit className="text-purple-400" />
          Learn
        </Button>
      </Link>
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
