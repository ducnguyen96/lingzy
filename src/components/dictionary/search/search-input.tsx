import { useDictSearch } from "@/components/providers/dict-search-provider";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const { search, setSearch } = useDictSearch();

  return (
    <div className="md:px-16 lg:px-32 xl:px-64">
      <div className="text-center">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
          placeholder="Search"
          className="rounded-3xl p-6"
        />
        <p className="mt-6 px-6 font-light">
          An online dictionary for learners of American English, offering free
          access to definitions, images, example sentences, synonyms, and more
        </p>
      </div>
    </div>
  );
}
