import { SevDaysProgressChart } from "@/components/charts/sev-days-progress-chart";
import { overviewConf } from "@/config/overview";
import { cn } from "@/lib/utils";
import { DailyWordsOverview } from "@/lib/server/services/daily-word";

export default function Overview({
  overview,
}: {
  overview: DailyWordsOverview;
}) {
  return (
    <div className="lg:p-6 lg:bg-primary/5  rounded-3xl">
      <p className="text-xl font-bold p-4">Overview</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/10 rounded-3xl">
          <SevDaysProgressChart chartData={overview.sevDays} />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary/10 rounded-3xl">
          {Object.entries(overviewConf).map(([key, { icon, title }]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-3xl bg-background p-4 lg:p-6"
            >
              <div className="flex items-center gap-2">
                <icon.icon
                  size={40}
                  className={cn("rounded-full bg-primary/10 p-2", icon.color)}
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
  );
}
