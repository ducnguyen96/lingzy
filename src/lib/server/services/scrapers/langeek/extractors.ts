import { InsertWordDTO } from "@/lib/server/schemas";
import https from "https";
import { createWriteStream, existsSync } from "fs";

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

  return {
    title: originalTitle,
    photo: downloadPhoto(photo),
    thumbnail: downloadPhoto(photoThumbnail),
  };
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

function downloadPhoto(url: string) {
  const segments = url.split("/");
  const photoId = segments[4];

  const filepath = `/photo/${photoId}_${segments[5]}.jpeg`;
  const saveDir = process.env.SAVE_DIR || "public";
  const wholePath = process.cwd() + `/${saveDir}${filepath}`;

  if (existsSync(wholePath)) return filepath;

  https.get(url, (response) => {
    const fileStream = createWriteStream(wholePath);
    response.pipe(fileStream);

    fileStream.on("finish", () => {
      fileStream.close();
    });
  });

  return filepath;
}
