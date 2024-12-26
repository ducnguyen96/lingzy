import { useDictSearch } from "@/components/providers/dict-search-provider";
import { SearchResultItem } from "./search-result-item";
import { Skeleton } from "@/components/ui/skeleton";
import NoResult from "./no-result";

export default function SearchResult() {
  const { isPending, wordEntities, debounced } = useDictSearch();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {isPending &&
          [...Array(Math.floor(Math.random() * 8) + 1)].map((_, idx) => (
            <Skeleton key={idx} className="h-60 rounded-lg" />
          ))}
        {wordEntities
          .sort((a, b) => a.word.length - b.word.length)
          .map((word) => (
            <SearchResultItem key={word.id} {...word} />
          ))}
      </div>
      {debounced && !isPending && !wordEntities.length && <NoResult />}
    </>
  );
}
