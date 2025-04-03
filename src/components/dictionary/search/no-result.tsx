import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useActionState, useEffect, useState, useTransition } from "react";
import { useDictSearch } from "@/components/providers/dict-search-provider";
import { scrape } from "@/lib/server/mutations/dictionary/scrape";

interface Props {
  customAction?: {
    word: string;
    callBack: () => void;
  };
}

export default function NoResult({ customAction }: Props) {
  const { search, formAction: searchAction } = useDictSearch();
  const [progress, setProgress] = useState(10);

  const [state, formAction, isPending] = useActionState(async () => {
    const progressRef = { current: progress };

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = 10 + Math.round(0.9 * prevProgress);
        progressRef.current = newProgress;
        return newProgress;
      });
    }, 300);

    const { ok } = await scrape("en", customAction?.word || search);

    clearInterval(interval);
    setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProgress(0);

    return ok;
  }, undefined);

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state) startTransition(customAction?.callBack || searchAction);
  }, [state]);

  return (
    <div className="text-center mt-20">
      <div className="space-y-8 text-muted-foreground">
        <p className="text-5xl">(⁠╥⁠﹏⁠╥⁠)</p>
        <p className="text-2xl">Sorry, we couldn&apos;t find any results.</p>
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span>Scrape the internet?</span>
            <form action={formAction}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                disabled={isPending}
              >
                <div
                  className={`${isPending ? "animate-circling" : "inline-block"}`}
                >
                  <Search />
                </div>
              </Button>
            </form>
          </div>
          {isPending && (
            <Progress
              value={progress}
              className="w-[60%] [&>div]:duration-1000"
            />
          )}
        </div>
      </div>
    </div>
  );
}
