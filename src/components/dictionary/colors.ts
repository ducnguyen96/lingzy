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
