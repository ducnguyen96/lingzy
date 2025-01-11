"use server";

import { findFirst, insertOne } from "../../services/dictionary";
import { CambridgeScraper } from "../../services/scrapers/cambridge";
import { LangeekScraper } from "../../services/scrapers/langeek";
import { SohaScraper } from "../../services/scrapers/soha";

export async function scrape(lang: string, word: string, scrapeAll?: boolean) {
  const found = await findFirst(lang, word);
  if (found) return { ok: false };

  const langeek = new LangeekScraper();
  const cambridge = new CambridgeScraper();
  const soha = new SohaScraper();

  const res = await fetch(
    `https://api.langeek.co/v1/cs/${lang}/word/?term=${word}&filter=,inCategory,photo`,
    { headers: langeek.defaultHeaders },
  );
  if (!res.ok) return { ok: false };

  interface Entry {
    id: string;
    entry: string;
  }
  const entries: Entry[] = await res.json();

  const scrapeEntry = async ({ id, entry }: Entry) => {
    const langeekResult = await langeek.scrape(lang, entry, id);
    if (!langeekResult) return;

    const cambridgeResult = await cambridge.scrape(lang, word);
    if (cambridgeResult) {
      langeekResult.pronunciations = cambridgeResult.pronunciations;
    }

    const sohaResult = await soha.scrape(lang, word);
    if (sohaResult) {
      langeekResult.translations = [
        ...langeekResult.translations,
        ...sohaResult.translations,
      ];
    }

    return insertOne(langeekResult);
  };

  const promises = entries.map(async (entry) => {
    if (entry.entry === word) await scrapeEntry(entry);
    if (entry.entry !== word && scrapeAll) scrapeEntry(entry);
  });

  await Promise.all(promises);
  return { ok: true };
}
