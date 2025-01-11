import { InsertWordDTO } from "@/lib/server/schemas";

export const extractTranslation = (
  lang: string,
  trans: Translation,
  examples: StaticProps["simpleExamples"],
): InsertWordDTO["translations"][0] => {
  const { antonyms, level, title, type, id } = trans;
  const { wordPhoto, translation, synonyms, subTranslations } = trans;

  return {
    lang,
    translation,
    synonyms: synonyms.map((s) => s.word),
    antonyms: antonyms.map((s) => s.word),
    examples: examples[id].map((e) => e.words.join("")),
    level,
    title,
    type,
    wordPhoto: extractWordPhoto(wordPhoto),
    subTranslations: extractSubTranslation(examples, subTranslations),
    wordId: 1,
  };
};

const extractWordPhoto = (wordPhoto: WordPhoto) => {
  if (!wordPhoto) return;
  const { photo, photoThumbnail, originalTitle } = wordPhoto;

  // TODO: get own url
  return { title: originalTitle, photo, thumbnail: photoThumbnail };
};

const extractSubTranslation = (
  examples: StaticProps["simpleExamples"],
  sub?: SubTranslation[],
): InsertWordDTO["translations"][0]["subTranslations"] => {
  if (!sub) return [];

  return sub.map(({ id, level, translation, wordPhoto }) => ({
    level,
    translation,
    examples: examples[id].map((e) => e.words.join("")),
    wordPhoto: extractWordPhoto(wordPhoto),
    parentId: 1,
  }));
};
