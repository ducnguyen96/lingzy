import TranslationBox from "@/components/dictionary/translation-box";
import TranslationGroupBox from "@/components/dictionary/translation-group-box";
import WordBox from "@/components/dictionary/word-box";
import {
  TranslationEntity,
  WordEntity,
} from "@/lib/server/services/dictionary";

type TranslationGroup = {
  type: string;
  title: string;
  translations: TranslationEntity[];
};

export function DictContent(props: WordEntity) {
  const { word, pronunciations, translations } = props;

  const groups: TranslationGroup[] = [];
  for (let i = 0; i < translations.length; i++) {
    const trans = translations[i];
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
    <div id="dict-content" className="space-y-4 md:space-y-8">
      <WordBox
        word={word}
        pronunciations={pronunciations}
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
