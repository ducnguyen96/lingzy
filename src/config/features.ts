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
  Icon: LucideIcon;
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
    Icon: Newspaper,
  },
  {
    title: "Grammar",
    color: cardColors("emerald"),
    href: "/learn/grammar",
    description: "How to make sentences",
    Icon: BookOpenText,
  },
  {
    title: "Expressions",
    color: cardColors("indigo"),
    href: "/learn/expressions",
    description: "Idioms and Proverbs",
    Icon: Lightbulb,
  },
  {
    title: "Pronunciation",
    color: cardColors("yellow"),
    href: "/learn/pronunciation",
    description: "How to read letters",
    Icon: Speech,
  },
  {
    title: "Reading",
    color: cardColors("red"),
    href: "/learn/reading",
    description: "Use your knowledge",
    Icon: BookCopy,
  },
];

export const wordTypeToColor = (typ: string, prefix: string = "text") => {
  const normalized = typ.toLowerCase().split(" ").join("_");

  switch (normalized) {
    case "động_từ":
    case "ngoại_động_từ":
    case "nội_động_từ":
    case "verb":
      return prefix + "-green-400";

    case "danh_từ":
    case "noun":
      return prefix + "-blue-400";

    case "tính_từ":
    case "adjective":
      return prefix + "-orange-400";

    case "giới_từ":
    case "preposition":
      return prefix + "-cyan-400";

    case "trạng_từ":
    case "phó_từ":
    case "adverb":
      return prefix + "-pink-400";

    case "cụm_từ":
    case "phrase":
      return prefix + "-gray-400";

    case "câu":
    case "sentence":
      return prefix + "-purple-400";

    case "cụm_từ":
    case "adjective_adverb":
      return prefix + "-orange-400";

    default:
      return prefix + "-primary/20";
  }
};
