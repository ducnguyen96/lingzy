import FeatureCards from "@/components/learn/feature-cards";

function HeroSecion() {
  return (
    <section className="flex justify-center flex-col items-center mt-6 sm:mt-16 mx-4 gap-4 sm:gap-6 mb-6">
      <h1 className="mt-4">
        <span className="text-2xl font-semibold">Learn with </span>
        <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#2666C8] via-[#9465e7] to-[#9465E7] dark:from-[#56AEFF] dark:to-55% dark:to-[#B57AFF]">
          Lingzy
        </span>
      </h1>
      <p className="font-light text-center sm:text-lg mb-6 lg:mb-10">
        Lingzy is a language learning platform that makes your learning process
        faster and easier.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSecion />
      <FeatureCards />
    </>
  );
}
