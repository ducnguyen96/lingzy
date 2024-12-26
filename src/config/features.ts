import {
  BookCopy,
  BookOpenText,
  Lightbulb,
  LucideIcon,
  Newspaper,
  Speech,
} from "lucide-react";

type CardColorClasses = {
  background: string;
  button: string;
  icon: string;
};

export type LearnFeature = {
  title: string;
  description: string;
  color: CardColorClasses;
  href: string;
  icon: {
    icon: LucideIcon;
  };
};

const cardColors = (color: string): CardColorClasses => {
  return {
    background: `bg-${color}-50 dark:bg-${color}-900`,
    button: `bg-${color}-100 dark:bg-${color}-950`,
    icon: `text-${color}-600 dark:text-${color}-300 `,
  };
};

export const learnFeatures: LearnFeature[] = [
  {
    title: "Vocabulary",
    color: cardColors("violet"),
    href: "/learn/vocabulary",
    description: "Learn New Words",
    icon: { icon: Newspaper },
  },
  {
    title: "Grammar",
    color: cardColors("emerald"),
    href: "/learn/grammar",
    description: "How to make sentences",
    icon: { icon: BookOpenText },
  },
  {
    title: "Expressions",
    color: cardColors("indigo"),
    href: "/learn/expressions",
    description: "Idioms and Proverbs",
    icon: { icon: Lightbulb },
  },
  {
    title: "Pronunciation",
    color: cardColors("yellow"),
    href: "/learn/pronunciation",
    description: "How to read letters",
    icon: { icon: Speech },
  },
  {
    title: "Reading",
    color: cardColors("red"),
    href: "/learn/reading",
    description: "Use your knowledge",
    icon: { icon: BookCopy },
  },
];

export const wordTypeToColor = (typ: string, prefix: string = "text") => {
  const normalized = typ.toLowerCase().split(" ").join("_");

  switch (normalized) {
    case "verb":
      return prefix + "-green-400";
    case "noun":
      return prefix + "-blue-400";
    case "adjective":
      return prefix + "-orange-400";
    case "preposition":
      return prefix + "-cyan-400";
    case "adverb":
      return prefix + "-pink-400";
    case "phrase":
      return prefix + "-gray-400";
    case "sentence":
      return prefix + "-purple-400";
    default:
      return prefix + "-foreground";
  }
};
