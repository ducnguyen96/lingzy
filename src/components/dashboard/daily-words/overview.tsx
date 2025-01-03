import { DailyWordsOverview } from "@/lib/server/services/daily-word";
import { LearnedWordsChart } from "@/components/charts/learned-words-chart";
import { everyComp, overviewConf } from "@/config/overview";
import { cn } from "@/lib/utils";
import { ArrowRight, GraduationCap, Hourglass, Layers } from "lucide-react";
import { cloneElement, JSX } from "react";
import WithOpenSidebar from "../with-open-sidebar";

interface EveryComponentProps {
  text: string;
  value: number;
  badge: JSX.Element;
  color: string;
}

function EveryComponent(props: EveryComponentProps) {
  const { text, value, badge, color } = props;

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Layers size={40} className={`text-${color}`} strokeWidth={1} />
        <div
          className={cn(
            "absolute flex items-center justify-center w-5 h-5 text-sm font-semibold rounded-full bottom-0 -right-1",
            `bg-${color}`,
          )}
        >
          {cloneElement(badge)}
        </div>
      </div>
      <div className="flex flex-1 bg-background rounded-3xl p-4 items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="lg:text-lg">{text}</span>
          <div
            className={cn(
              "p-2 py-1 space-x-2 bg-opacity-50 rounded-3xl",
              `text-${color} bg-${color}`,
            )}
          >
            <span className="font-semibold textsm">{value}</span>
            <span>Word</span>
          </div>
        </div>
        <ArrowRight />
      </div>
    </div>
  );
}

export default function Overview({
  overview,
}: {
  overview: DailyWordsOverview;
}) {
  const chartData = Object.entries(overview.progress.details).map(
    ([key, value]) => ({ date: key, value }),
  );
  return (
    <WithOpenSidebar>
      <div className="my-auto h-full justify-center items-center lg:p-4 lg:bg-primary/10 space-y-4">
        {/* Overview */}
        <div className="lg:p-6 bg-background rounded-t-3xl">
          <p className="text-xl font-bold py-4">Overview</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 rounded-3xl">
              <LearnedWordsChart chartData={chartData} />
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary/10 rounded-3xl">
              {Object.entries(overviewConf).map(([key, { icon, title }]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-3xl bg-background p-2 md:p-4 lg:p-8"
                >
                  <div className="flex items-center gap-2">
                    <icon.icon
                      size={40}
                      className={cn(
                        "rounded-full bg-primary/10 p-2",
                        icon.color,
                      )}
                    />
                    <span>{title}</span>
                  </div>
                  {/* @ts-expect-error valid key */}
                  <span className="font-semibold">{overview[key] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Every */}
        <div className="p-6 gap-6 bg-primary/20 grid grid-cols-1 lg:grid-cols-2 rounded-b-3xl">
          <EveryComponent
            badge={<Hourglass size={14} />}
            color="orange-400"
            text="Waiting"
            value={overview.waiting}
          />
          {Object.entries(everyComp).map(([key, { title }], idx) => (
            <EveryComponent
              key={key}
              badge={<span>{idx + 1}</span>}
              color="purple-400"
              text={title}
              // @ts-expect-error valid key
              value={overview[key]}
            />
          ))}
          <EveryComponent
            badge={<GraduationCap size={14} />}
            color="green-400"
            text="Learned"
            value={overview.learned}
          />
        </div>
      </div>
    </WithOpenSidebar>
  );
}
