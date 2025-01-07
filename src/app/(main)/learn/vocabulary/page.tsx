import { auth } from "@/auth";
import MyWordLists from "./components/my-word-lists";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="lg:px-28 xl:px-52 2xl:px-72">
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold">English Vocabulary</p>
        <p>
          Let's start your journey to learn categorized English vocabulary on
          Langeek
        </p>
      </div>
      <section className="mt-8">
        {user && (
          <Suspense fallback={<Skeleton className="w-full h-20" />}>
            <MyWordLists />
          </Suspense>
        )}
      </section>
    </div>
  );
}
