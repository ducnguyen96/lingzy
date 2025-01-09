import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WordEntity } from "@/lib/server/services/dictionary";
import { wordTypeToColor } from "@/config/features";
import { useDictSearch } from "@/components/providers/dict-search-provider";
import { noPhoto } from "@/config/placeholder";

export function SearchResultItem(props: WordEntity) {
  const { search, setSearch } = useDictSearch();
  const { id, word, translations } = props;
  const displayTrans = translations[0];
  return (
    <Link
      key={id}
      href={`/dictionary/en/${word}`}
      className={search ? "flex flex-col p-4 border rounded-lg" : "hidden"}
      onClick={() => setSearch("")}
    >
      <Image
        src={displayTrans.wordPhoto?.thumbnail || noPhoto}
        width={256}
        height={256}
        alt={word}
        className="h-36 m-auto rounded-3xl"
      />
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="flex flex-col space-y-2">
          <p className="font-semibold">{word}</p>
          <p className="text-muted-foreground">{displayTrans.translation}</p>
        </div>
        <p className={cn("font-semibold", wordTypeToColor(displayTrans.type))}>
          [ {displayTrans.type} ]
        </p>
      </div>
    </Link>
  );
}
