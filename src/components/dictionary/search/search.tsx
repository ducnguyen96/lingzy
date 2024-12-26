"use client";

import { DictSearchProvider } from "@/components/providers/dict-search-provider";
import SearchInput from "./search-input";
import SearchResult from "./search-result";

export default function DictSearch() {
  return (
    <div className="py-10">
      <DictSearchProvider>
        <SearchInput />
        <SearchResult />
      </DictSearchProvider>
    </div>
  );
}
