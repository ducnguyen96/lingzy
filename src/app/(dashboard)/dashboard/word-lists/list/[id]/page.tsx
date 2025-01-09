import { getById } from "@/lib/server/queries/user/word-lists";
import { Translation } from "./components/translation";
import Overview from "./components/overview";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  const { wordList, translations } = await getById(id);

  return (
    <div className="space-y-8">
      <Overview wordList={wordList} />
      <div className="space-y-4">
        <p>Word:</p>
        <div className="grid grid-cols-16 gap-4">
          {translations.map((entity) => (
            <Translation
              key={entity.id}
              entity={entity}
              className="col-span-8 md:col-span-4 xl:col-span-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
