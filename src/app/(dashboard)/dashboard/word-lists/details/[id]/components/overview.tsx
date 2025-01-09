import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { noPhoto } from "@/config/placeholder";
import { WordListEntity } from "@/lib/server/services/word-list";
import { TZDate } from "@date-fns/tz";

import { format } from "date-fns";
import { CalendarDays, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  wordList: WordListEntity;
}

export default function Overview({ wordList }: Props) {
  const { thumbnail, title, visibility, createdAt } = wordList;
  const date = new TZDate(createdAt);

  return (
    <div className="p-4 bg-primary/5 rounded-3xl shadow-foreground/30 shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Image
            width={100}
            height={100}
            src={thumbnail || noPhoto}
            alt={title}
            className="rounded-2xl h-20 w-20 shadow-foreground/30 shadow"
          />
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Private</Label>
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Public</Label>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="max-w-48 space-y-2">
            <p className="line-clamp-1">{title}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <CalendarDays strokeWidth={1} size={20} />
                <span className="text-xs text-muted-foreground">
                  {date.getDate()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(date, "MMM")}
                </span>
              </div>
            </div>
          </div>
          <Button className="rounded-3xl">
            <Link
              href=""
              prefetch={false}
              className="flex gap-2 items-center [&_svg]:size-6"
            >
              <GraduationCap />
              Study
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
