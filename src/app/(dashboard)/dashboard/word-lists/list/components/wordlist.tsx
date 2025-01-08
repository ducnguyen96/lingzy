import { Skeleton } from "@/components/ui/skeleton";
import { WordListEntity } from "@/lib/server/services/word-list";
import { cn } from "@/lib/utils";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { Bookmark, CalendarDays } from "lucide-react";
import Image from "next/image";

export function Wordlist(props: {
  className?: string;
  entity: WordListEntity;
  isBookmark?: boolean;
}) {
  const { className, entity, isBookmark } = props;
  const { thumbnail, title, owner, createdAt } = entity;
  const date = new TZDate(createdAt);

  return (
    <div className={cn("space-y-4 bg-background p-4 rounded-3xl", className)}>
      <div className="flex flex-col items-center gap-2">
        <Image
          width={200}
          height={200}
          alt=""
          className="rounded-2xl w-16 h-16 lg:w-24 lg:h-24"
          src={thumbnail || "/assets/photo/no-photo.png"}
        />
        <span className="text-sm line-clamp-1">{title}</span>
      </div>
      {isBookmark && (
        <div className="space-x-2 flex items-center">
          <Image
            width={40}
            height={40}
            alt=""
            className="w-6 h-6 rounded-full"
            src={owner.image || "/assets/photo/no-photo.png"}
          />
          <span className="text-xs">{owner.name}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-muted-foreground">
          <CalendarDays strokeWidth={1} size={20} />
          <span className="text-xs text-muted-foreground">
            {date.getDate()}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(date, "MMM")}
          </span>
        </div>
        {isBookmark ? <Bookmark /> : null}
      </div>
    </div>
  );
}

export function WordlistsFallback() {
  const rand = Math.round(Math.random() * 8);
  const arr = Array(rand).fill(1);
  return (
    <div className="grid grid-cols-8 gap-6">
      {arr.map((_, idx) => (
        <Skeleton key={idx} className="h-40 rounded-2xl col-span-1" />
      ))}
    </div>
  );
}
