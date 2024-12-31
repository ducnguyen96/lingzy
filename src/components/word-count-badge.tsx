import { Badge } from "./ui/badge";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export function DailyWordBadge() {
  const count = fetch("/api/user/daily-words?count=true")
    .then((res) => res.json())
    .then((res) => res["data"]);
  return (
    <Suspense fallback={<Skeleton className="w-8 h-5" />}>
      <Badge>{count}</Badge>
    </Suspense>
  );
}
