import * as cheerio from "cheerio";
import { Scraper } from "../scraper";
import { InsertWordDTO } from "@/lib/server/schemas";

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
            const originUrl = `${URL}${src}`;
            dto.pronunciations.push({
              // TODO: get own url
              audio: originUrl,
              country: $(dpronI).find(".region").text(),
              phonetic: $(dpronI).find(".ipa").text(),
              wordId: 1,
            });
          });
      });

    return dto;
  }
}
