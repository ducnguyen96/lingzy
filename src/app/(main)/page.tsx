import FeatureCards from "@/components/learn/feature-cards";

function HeroSecion() {
  return (
    <section className="flex justify-center flex-col items-center mt-6 sm:mt-16 mx-4 gap-4 sm:gap-6 mb-6">
      <h1 className="mt-4">
        <span className="text-2xl font-semibold">Learn with </span>
        <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-text bg-gradient-size drop-shadow">
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
