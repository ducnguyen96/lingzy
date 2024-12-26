"use server";

import { scrapeLangeek } from "../../services/scraper";

interface ScrapeBody {
  word: string;
  lang: string;
}

export async function scrape(body: ScrapeBody) {
  try {
    await scrapeLangeek(body, true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
  return { ok: true };
}
