import { and, eq } from "drizzle-orm";
import * as cheerio from "cheerio";
import db from "../db";
import {
  InsertPronunciationDTO,
  InsertSubTranslationDTO,
  InsertWordDTO,
  words,
} from "../schemas";
import { FindDTO, insertOne } from "./dictionary";
import https from "https";
import { createWriteStream } from "fs";
import { getFilename } from "@/lib/utils";

type LanGeekEntry = {
  id: number;
  entry: string;
};

type WordPhoto = {
  originalTitle: string;
  photo: string;
  photoThumbnail: string;
};

type SubTranslation = {
  level: string;
  translation: string;
  wordPhoto: WordPhoto;
};

type Translation = {
  translation: string;
  synonyms: { word: string }[];
  antonyms: { word: string }[];
  level: string;
  title: string;
  type: string;
  wordPhoto: WordPhoto;
  subTranslations: SubTranslation[];
};

type NlpExactExamplesItem = {
  examples: string[][][];
  subTranslationExamples?: string[][][][];
};

type LGStatic = {
  wordEntry: {
    words: {
      translations: Translation[];
    }[];
  };
  nearbyWords: { entry: string }[];
  nlpExactExamplesItem: NlpExactExamplesItem[];
};

async function downloadFile(url: string, path: string) {
  const filepath = process.cwd() + `/public${path}`;
  return https
    .get(url, (response) => {
      const fileStream = createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
      });
    })
    .on("error", (error) => {
      console.error(`Error downloading file: ${error.message}`);
    });
}

const scrapeCambridgeWord = async (word: string) => {
  const domain = "dictionary.cambridge.org";
  const baseUrl = `https://${domain}`;
  const source = `${baseUrl}/dictionary/english/${word}`;

  const response = await fetch(source, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
    },
  });
  if (!response.ok) return [];

  const html = await response.text();
  const $ = cheerio.load(html);

  const pronunciations: InsertPronunciationDTO[] = [];
  const downloadPs: Promise<any>[] = [];

  $(".dictionary:first-child")
    .first()
    .find("div.entry")
    .first()
    .find("div.pos-header")
    .each((_, posHeader) => {
      $(posHeader)
        .find("span.dpron-i")
        .each((idx, dpronI) => {
          if (idx > 1) return;
          const src = $(dpronI).find("audio source").attr("src") || "";
          const originUrl = `${baseUrl}${src}`;
          const audio = getFilename("audio");
          const pronunciation: InsertPronunciationDTO = {
            audio,
            country: $(dpronI).find(".region").text(),
            phonetic: $(dpronI).find(".ipa").text(),
            wordId: 1,
          };
          pronunciations.push(pronunciation);

          downloadPs.push(downloadFile(originUrl, audio));
        });
    });

  await Promise.all(downloadPs);

  return pronunciations;
};

const scrapeLangeekWord = async (lang: string, word: string, id: number) => {
  const found = await db.query.words.findFirst({
    where: and(eq(words.lang, lang), eq(words.word, word)),
  });
  if (found) return;

  const res = await fetch(
    `https://dictionary.langeek.co/_next/data/lFF5zXONOfZDe1GDNta6a/${lang}/word/${id}.json`,
  );
  if (!res.ok) return;
  const json = await res.json();

  try {
    const downloadPs: Promise<any>[] = [];
    const staticJ = json["pageProps"]["initialState"]["static"] as LGStatic;
    const wordEntry = staticJ["wordEntry"]["words"][0];
    const nearByWords = staticJ["nearbyWords"].map((word) => word["entry"]);
    const examples = staticJ["nlpExactExamplesItem"];

    const pronunciations = await scrapeCambridgeWord(word);

    const dto: InsertWordDTO = {
      lang,
      word,
      nearByWords,
      pronunciations,
      translations: wordEntry["translations"].map((ts, idx) => {
        let wordPhoto;
        let subTranslations: InsertSubTranslationDTO[] = [];
        if (ts["wordPhoto"]) {
          const photoOrigurl = ts["wordPhoto"]["photo"];
          const thumbOrigurl = ts["wordPhoto"]["photoThumbnail"];
          const photoPath = getFilename("photo");
          const thumbPath = getFilename("photo");
          wordPhoto = {
            title: ts["wordPhoto"]["originalTitle"],
            photo: photoPath,
            thumbnail: thumbPath,
          };
          downloadPs.push(downloadFile(photoOrigurl, photoPath));
          downloadPs.push(downloadFile(thumbOrigurl, thumbPath));
        }
        if (ts["subTranslations"]) {
          subTranslations = ts["subTranslations"].map((st, stIx) => {
            let wordPhoto;
            if (st["wordPhoto"]) {
              const photoOrigurl = st["wordPhoto"]["photo"];
              const thumbOrigurl = st["wordPhoto"]["photoThumbnail"];
              const photoPath = getFilename("photo");
              const thumbPath = getFilename("photo");

              wordPhoto = {
                title: st["wordPhoto"]["originalTitle"],
                photo: photoPath,
                thumbnail: thumbPath,
              };

              downloadPs.push(downloadFile(photoOrigurl, photoPath));
              downloadPs.push(downloadFile(thumbOrigurl, thumbPath));
            }

            const sExamples = examples[idx]["subTranslationExamples"] || [];

            return {
              level: st["level"],
              translation: st["translation"],
              examples: sExamples[stIx].map((ex) => ex[0].join("")),
              wordPhoto,
              parentId: 1,
            };
          });
        }
        return {
          lang,
          translation: ts["translation"],
          synonyms: ts.synonyms.map((s) => s["word"]),
          antonyms: ts.antonyms.map((s) => s["word"]),
          examples: examples[idx]["examples"].map((ex) => ex[0].join("")),
          level: ts["level"],
          title: ts["title"],
          type: ts["type"],
          wordPhoto,
          subTranslations,
          wordId: 1,
        };
      }),
    };
    await Promise.all(downloadPs);

    await insertOne(dto);
  } catch (error) {
    console.error("word: ", word);
    console.error(error);
  }
};

export const scrapeLangeek = async (
  { lang, word }: FindDTO,
  scrapeRelated?: boolean,
) => {
  const res = await fetch(
    `https://api.langeek.co/v1/cs/${lang}/word/?term=${word}&filter=,inCategory,photo`,
  );
  if (!res.ok) return;

  const json: LanGeekEntry[] = await res.json();

  const ps = json.map(async ({ id, entry }) => {
    if (entry === word) {
      await scrapeLangeekWord(lang, entry, id);
    } else if (scrapeRelated) {
      scrapeLangeekWord(lang, entry, id);
    }
  });

  await Promise.all(ps);
};
