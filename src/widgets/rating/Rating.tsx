import { cn } from "@/lib/utils/component.utils";
import { StarIcon } from "@heroicons/react/24/solid";

interface RatingProps {
  rating: number;
}

export default function CustomRating({ rating }: RatingProps) {
  return (
    <>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((count) => (
          <StarIcon
            key={count}
            className={cn(
              rating >= count ? "text-brand-accent" : "text-gray-200",
              "h-4 w-4 flex-shrink-0 cursor-pointer transition-all"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    </>
  );
}
