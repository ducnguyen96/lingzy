import { FeatureCard } from "@/components/learn/feature-card";
import { learnFeatures } from "@/config/features";

export default function FeatureCards() {
  return (
    <div className="grid grid-rows-10 grid-cols-2 gap-4 h-[600px] lg:px-16 xl:px-40 2xl:px-96">
      <FeatureCard className="row-span-6" feature={learnFeatures[0]} />
      <FeatureCard className="row-span-4" feature={learnFeatures[1]} />
      <FeatureCard
        className="row-start-7 row-span-4"
        feature={learnFeatures[2]}
      />
      <FeatureCard className="row-span-3" feature={learnFeatures[3]} />
      <FeatureCard className="row-span-3" feature={learnFeatures[4]} />
    </div>
  );
}
