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
    icon: { icon: LucideIcon; color: string };
    title: string;
  }
>;

export const overviewConf: OverviewConf = {
  day: {
    icon: { icon: CalendarDays, color: "text-blue-400" },
    title: "Day",
  },
  waiting: {
    icon: { icon: Hourglass, color: "text-orange-400" },
    title: "Waiting",
  },
  learning: {
    icon: { icon: BrainCircuit, color: "text-purple-400" },
    title: "Learning",
  },
  learned: {
    icon: { icon: GraduationCap, color: "text-green-400" },
    title: "Learned",
  },
};

export const everyComp = {
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
};
