import { LearnFeature } from "@/config/features";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FeatureCardProps = {
  className: string;
  feature: LearnFeature;
};

export function FeatureCard(props: FeatureCardProps) {
  const { className, feature } = props;
  const { title, description, color, href, icon } = feature;
  return (
    <Link
      href={href}
      className={cn(
        className,
        "flex flex-col justify-between rounded-3xl p-4",
        color.background,
      )}
    >
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs font-light">{description}</p>
      </div>
      <div className="flex justify-center">
        <icon.icon
          strokeWidth={1}
          size={50}
          className={cn("animate-wiggle w-10 md:w-60", color.icon)}
        />
      </div>
      <div className="flex justify-end">
        <div className={cn("rounded-full p-3", color.button)}>
          <p className={cn("font-light text-sm", color.icon)}>
            {title.slice(0, 2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
