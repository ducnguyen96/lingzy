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

  try {
    const res = await fetch(
      `https://api.langeek.co/v1/cs/${lang}/word/?term=${word}&filter=,inCategory,photo`,
      { headers: langeek.defaultHeaders },
    );

    if (!res.ok) return { ok: false };

    const entries: Entry[] = await res.json();

    const scrapeEntry = async ({ id, entry }: Entry) => {
      const [lRes, cRes, sRes] = await Promise.all([
        langeek.scrape(lang, entry, id),
        cambridge.scrape(lang, word),
        soha.scrape(lang, word),
      ]);
      if (!lRes) return;

      if (cRes) lRes.pronunciations = cRes.pronunciations;
      if (sRes)
        lRes.translations = [...lRes.translations, ...sRes.translations];

      if (!lRes.translations.length) return;

      return insertOne(lRes);
    };

    const promises = entries.map(async (entry) => {
      if (entry.entry === word) await scrapeEntry(entry);
      if (entry.entry !== word && scrapeAll) scrapeEntry(entry);
    });

    await Promise.all(promises);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
}
