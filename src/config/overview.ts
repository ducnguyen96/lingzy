import {
  BrainCircuit,
  CalendarDays,
  GraduationCap,
  Hourglass,
  LucideIcon,
} from "lucide-react";

type OverviewConf = Record<
  "day" | "waiting" | "learning" | "learned",
  {
    icon: { icon: LucideIcon; color: string; hex: string };
    title: string;
  }
>;

export const overviewConf: OverviewConf = {
  day: {
    icon: { icon: CalendarDays, color: "text-blue-400", hex: "#60a5fa" },
    title: "Day",
  },
  waiting: {
    icon: { icon: Hourglass, color: "text-orange-400", hex: "#fb923c" },
    title: "Waiting",
  },
  learning: {
    icon: { icon: BrainCircuit, color: "text-purple-400", hex: "#c084fc" },
    title: "Learning",
  },
  learned: {
    icon: { icon: GraduationCap, color: "text-green-400", hex: "#4ade80" },
    title: "Learned",
  },
};

export const everyComp: Record<string, { title: string }> = {
  every1: {
    title: "Everyday",
  },
  every2: {
    title: "Every 2 days",
  },
  every4: {
    title: "Every 4 days",
  },
  every8: {
    title: "Every 8 days",
  },
  every16: {
    title: "Every 16 days",
  },
  every32: {
    title: "Every 32 days",
  },
  others: {
    title: "Others",
  },
};
