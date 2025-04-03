import * as cheerio from "cheerio";
import { Scraper } from "../scraper";
import { InsertWordDTO } from "@/lib/server/schemas";
import https from "https";
import { createWriteStream, existsSync } from "fs";

const URL = "https://dictionary.cambridge.org";
const TO_SOURCE_URL = (word: string) => `${URL}/dictionary/english/${word}`;

export class CambridgeScraper extends Scraper {
  constructor() {
    super(URL);
  }
  async scrape(lang: string, word: string) {
    const source = TO_SOURCE_URL(word);
    const res = await fetch(source, { headers: this.defaultHeaders });
    if (!res.ok) return;

    const html = await res.text();
    const $ = cheerio.load(html);

    const dto: InsertWordDTO = {
      lang,
      word,
      // TODO: scrape nearByWords
      nearByWords: [],
      // TODO: scrape translations
      translations: [],
      pronunciations: [],
    };

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
            dto.pronunciations.push({
              audio: this.downloadAudio(src),
              country: $(dpronI).find(".region").text(),
              phonetic: $(dpronI).find(".ipa").text(),
              wordId: 1,
            });
          });
      });

    return dto;
  }

  downloadAudio = (origPath: string) => {
    const segments = origPath.split("/");

    const filepath = "/audio/" + segments[segments.length - 1];
    const saveDir = process.env.SAVE_DIR || "public";
    const wholePath = process.cwd() + `/${saveDir}${filepath}`;

    if (existsSync(wholePath)) return filepath;

    https.get(URL + origPath, (response) => {
      const fileStream = createWriteStream(wholePath);
      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
      });
    });

    return filepath;
  };
}
