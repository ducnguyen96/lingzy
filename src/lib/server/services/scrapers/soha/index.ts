import { InsertWordDTO } from "@/lib/server/schemas";
import * as cheerio from "cheerio";
import { Scraper } from "../scraper";

const URL = "http://tratu.soha.vn";
const TO_SOURCE_URL = (word: string) => `${URL}/dict/en_vn/${word}`;

export class SohaScraper extends Scraper {
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
      translations: [],
      pronunciations: [],
    };

    $("#bodyContent").each((_, dictE) => {
      $(dictE)
        .find("#content-3")
        .each((_, groups) => {
          const type = $(groups).find("h3 > span").first().text().trim();
          const lowercased = type.toLowerCase();
          if (lowercased.includes("đồng nghĩa")) return;
          if (lowercased.includes("trái nghĩa")) return;

          $(groups)
            .find("#content-5")
            .each((_, trans) => {
              const translation = $(trans).find("h5 > span").first();
              let dds = $(trans).find("dl > dd > dl > dd");
              if (dds.length % 2) {
                // @ts-expect-error should be fine
                dds = [translation, ...dds];
              }

              dto.translations.push({
                type,
                lang: "vi",
                title: translation.text(),
                translation: translation.text(),
                examples: [],
                subTranslations: [],
                wordId: 1,
              });

              const currentIdx = dto.translations.length - 1;
              for (let i = 0; i < dds.length; i += 2) {
                dto.translations[currentIdx].examples?.push(
                  `${$(dds[i]).text()} (${$(dds[i + 1]).text()})`,
                );
              }
            });
        });
    });

    return dto;
  }
}
