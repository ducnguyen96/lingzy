interface Entry {
  id: string;
  entry: string;
}

interface WordPhoto {
  originalTitle: string;
  photo: string;
  photoThumbnail: string;
}

interface SubTranslation {
  id: number;
  level: string;
  translation: string;
  wordPhoto: WordPhoto;
}

interface Translation {
  id: number;
  translation: string;
  synonyms: { word: string }[];
  antonyms: { word: string }[];
  level: string;
  title: string;
  type: string;
  wordPhoto: WordPhoto;
  subTranslations: SubTranslation[];
}

interface StaticProps {
  wordEntry: {
    words: {
      translations: Translation[];
    }[];
  };
  nearbyWords: { entry: string }[];
  simpleExamples: Record<
    number,
    {
      words: string[];
    }[]
  >;
}
