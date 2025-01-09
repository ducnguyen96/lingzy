"use client";
import SearchInput from "./search-input";
import SearchResult from "./search-result";

export default function DictSearch() {
  return (
    <div className="py-10">
      <SearchInput />
      <SearchResult />
    </div>
  );
}
