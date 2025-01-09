"use client";

import { WordEntity } from "@/lib/server/services/dictionary";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useActionState,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

interface DictSearchProps {
  search: string;
  debounced: string;
  setSearch: Dispatch<SetStateAction<string>>;
  formAction: () => void;
  wordEntities: WordEntity[];
  isPending: boolean;
}
const defaultContext: DictSearchProps = {
  setSearch: () => {},
  formAction: () => {},
  search: "",
  debounced: "",
  wordEntities: [],
  isPending: false,
};
const DictSearchContext = createContext<DictSearchProps>(defaultContext);

export const useDictSearch = () => useContext(DictSearchContext);

export const DictSearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const [state, formAction, isPending] = useActionState(async () => {
    const resp = await fetch(`/api/dictionary?s=${debouncedTerm}&lang=en`);

    const json = await resp.json();
    return json.data as WordEntity[];
  }, []);

  const [, startTransition] = useTransition();

  useEffect(() => {
    const dictContent = document.getElementById("dict-content");
    if (!debouncedTerm && dictContent && dictContent.style.display === "none") {
      dictContent.style.display = "block";
    }
    if (!debouncedTerm) return;

    startTransition(() => {
      formAction();
    });

    if (dictContent) dictContent.style.display = "none";
  }, [formAction, debouncedTerm]);

  return (
    <DictSearchContext.Provider
      value={{
        setSearch,
        search,
        wordEntities: state,
        isPending,
        formAction,
        debounced: debouncedTerm,
      }}
    >
      {children}
    </DictSearchContext.Provider>
  );
};
