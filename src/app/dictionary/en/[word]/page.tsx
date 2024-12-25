import TranslationBox from "@/components/dictionary/translation-box";
import TranslationGroupBox from "@/components/dictionary/translation-group-box";
import WordBox from "@/components/dictionary/word-box";
import { read } from "@/lib/server/queries/dictionary/read";
import { TranslationEntity } from "@/lib/server/services/dictionary";
import { promises as fs } from "fs";

type PageProps = {
  params: Promise<Awaited<ReturnType<typeof generateStaticParams>>[0]>;
};

export async function generateStaticParams() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/dictionary/en/mit-10.txt",
    "utf8",
  );

  const words = file.trim().split("\n");
  return words.map((word) => ({ word }));
}

export default async function Page({ params }: PageProps) {
  const { word } = await params;
  const details = await read({ word, lang: "en" });
  if (!details) return;

  type TranslationGroup = {
    type: string;
    title: string;
    translations: TranslationEntity[];
  };

  const groups: TranslationGroup[] = [];
  for (let i = 0; i < details.translations.length; i++) {
    const trans = details.translations[i];
    const found = groups.find(({ type }) => type === trans.type);
    if (!found) {
      groups.push({
        title: trans.title,
        type: trans.type,
        translations: [trans],
      });
    } else {
      found.translations.push(trans);
    }
  }

  return (
    <div className="md:px-8 space-y-4 md:space-y-8">
      <WordBox
        word={word}
        pronunciations={details.pronunciations}
        translations={groups.map(({ type, translations }) => ({
          type,
          quant: translations.length,
        }))}
      />
      <div className="space-y-16">
        {groups.map(({ type, title, translations }, idx) => (
          <TranslationGroupBox
            key={idx}
            className="space-y-4"
            title={title}
            type={type}
          >
            {translations.map((item, idx) => (
              <TranslationBox key={item.id} entity={item} idx={idx + 1} />
            ))}
          </TranslationGroupBox>
        ))}
      </div>
    </div>
  );
}
