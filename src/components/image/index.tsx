import { cn } from "@/lib/utils/component.utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function BlurImage({
  src,
  alt,
  className = "",
  ...others
}: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      src={src}
      className={cn(
        className,
        "duration-700 ease-in-out group-hover:opacity-75",
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      )}
      onLoadingComplete={() => setLoading(false)}
      {...others}
    />
  );
}
