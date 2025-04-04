import {
  TranslationEntity,
  WordPhotoEntity,
} from "@/lib/server/services/dictionary";
import { SwatchBookIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import UserActionBlock from "./user-action-block";

function DescriptionBox(props: { position: string; desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <p className="rounded-lg px-2 py-1 font-semibold border w-fit h-fit">
        {props.position}
      </p>
      <p className="font-semibold">{props.desc}</p>
    </div>
  );
}

type BoxProps = {
  idx: string;
  id: number;
  wordPhoto?: WordPhotoEntity;
  translation: string;
  title?: string;
  examples: string[];
  SubTranslations?: ReactNode;
};

function Box(props: BoxProps) {
  const { idx, id, wordPhoto, translation, title, examples, SubTranslations } =
    props;
  return (
    <div className="border rounded-2xl p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <DescriptionBox position={idx} desc={translation} />
          <UserActionBlock translationId={id} />
        </div>
        {wordPhoto && (
          <Image
            src={wordPhoto.photo}
            width={300}
            height={300}
            className="h-40 md:h-56 w-56 p-4 rounded-3xl"
            alt={`${title}-img`}
          />
        )}
      </div>
      {examples.length ? (
        <div className="rounded-2xl p-4 border text-muted-foreground space-y-4 mt-10">
          <div className="flex items-center gap-4">
            <SwatchBookIcon />
            <p>Example</p>
          </div>
          <ul className="list-disc space-y-2 text-sm list-inside">
            {examples.slice(0, 3).map((example, idx) => (
              <li key={idx}>{example}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {SubTranslations ? SubTranslations : null}
    </div>
  );
}

export default function TranslationBox(props: {
  entity: TranslationEntity;
  idx: number;
}) {
  const { idx, entity } = props;
  const { subTranslations, id } = entity;
  return (
    <Box
      idx={idx.toString()}
      {...entity}
      SubTranslations={
        <div className="space-y-4">
          {subTranslations.map((item, sIdx) => (
            <Box key={item.id} idx={`${idx}.${sIdx + 1}`} {...item} id={id} />
          ))}
        </div>
      }
    />
  );
}
