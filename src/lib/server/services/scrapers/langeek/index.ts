import { Scraper } from "../scraper";
import { InsertWordDTO } from "../../../schemas";
import { extractTranslation } from "./extractors";

const URL = "https://dictionary.langeek.co";
const DATA = "https://dictionary.langeek.co/_next/data";
const DATA_VERSION = process.env.LANGEEK_DATA_VERSION;
const TO_DATA_URL = (lang: string, id: string) =>
  `${DATA}/${DATA_VERSION}/${lang}/word/${id}.json`;

export class LangeekScraper extends Scraper {
  constructor() {
    super(URL);
  }

  async scrape(lang: string, word: string, id: string) {
    const res = await fetch(TO_DATA_URL(lang, id), {
      headers: this.defaultHeaders,
    });
    if (!res.ok) return;

    try {
      const json = await res.json();

      const props: StaticProps = json["pageProps"]["initialState"]["static"];
      const translations = props.wordEntry.words[0].translations;
      const nearByWords = props.nearbyWords.map((w) => w.entry);
      const examples = props.simpleExamples;

      const dto: InsertWordDTO = {
        lang,
        word,
        nearByWords,
        pronunciations: [],
        translations: [],
      };

      dto.translations = translations.map((trans) =>
        extractTranslation(lang, trans, examples),
      );
      return dto;
    } catch (error) {}
  }
}
