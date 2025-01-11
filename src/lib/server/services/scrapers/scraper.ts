import { InsertWordDTO } from "../../schemas";

export abstract class Scraper {
  base: string;
  defaultHeaders = {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
  };

  constructor(base: string) {
    this.base = base;
  }

  abstract scrape(
    lang: string,
    word: string,
    id?: string,
  ): Promise<InsertWordDTO | undefined>;
}
