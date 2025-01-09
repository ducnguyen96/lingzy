import { wordTypeToColor } from "@/config/features";
import { noPhoto } from "@/config/placeholder";
import { WordListWithTranslations } from "@/lib/server/services/word-list";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DeleteTranslation from "./delete-translation";
import { removeWordFromWordlist } from "@/lib/server/mutations/user/word-lists";
import { revalidatePath } from "next/cache";

interface Props {
  className?: string;
  entity: WordListWithTranslations["translations"][0];
  wordlistId: number;
}
export function Translation(props: Props) {
  const { className, entity, wordlistId } = props;
  const { wordPhoto, type, word, id } = entity;

  const deleteTranslation = async () => {
    "use server";
    await removeWordFromWordlist(id, wordlistId);
    revalidatePath(`/dashboard/word-lists/list/${wordlistId}`);
  };

  return (
    <div
      className={cn(
        "relative group flex flex-col items-center rounded-3xl bg-primary/5 p-4 shadow-foreground/10 hover:shadow-foreground/30 cursor-pointer shadow text-center",
        className,
      )}
    >
      <Image
        width={200}
        height={200}
        alt=""
        className="rounded-2xl w-16 h-16 lg:w-24 lg:h-24"
        src={wordPhoto?.thumbnail || noPhoto}
      />
      <span className="text-muted-foreground mt-4">{word.word}</span>
      <span
        className={cn(
          "text-xs line-clamp-1 w-full text-white font-semibold px-2 py-1 rounded uppercase",
          wordTypeToColor(type, "text"),
        )}
      >
        {type}
      </span>
      <DeleteTranslation action={deleteTranslation} />
    </div>
  );
}
