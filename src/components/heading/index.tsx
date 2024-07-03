import { VariantProps, cva } from "class-variance-authority";
import { Rubik } from "next/font/google";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/component.utils";

const inter = Rubik({
  subsets: ["cyrillic"],
  weight: ["700"],
  display: "swap",
  adjustFontFallback: false,
});

const headerClasses = cva(["w-fit"], {
  variants: {
    size: {
      h1: ["text-[44px] font-bold leading-[52px]"],
      h2: ["text-[36px] font-bold leading-[42px]"],
      h3: ["text-[28px] font-bold leading-[36px]"],
      h4: ["text-[24px] font-bold leading-[32px]"],
      h5: ["text-[18px] font-bold leading-[24px]"],
      h6: ["text-[14px] font-bold leading-[24px]"],
    },
  },
  //   Variants that apply when multiple other variant conditions are met.
  compoundVariants: [
    // Applied via:
    //   `button({ intent: "primary", size: "medium" })`
    // {
    //     intent: "primary",
    //     size: "medium",
    //     class: "…",
    //   },
  ],
  defaultVariants: {
    size: "h1",
  },
});

export interface HeadingProps
  extends DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    VariantProps<typeof headerClasses> {
  as?: HeaderTypes;
}
type HeaderTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function Heading({
  children,
  size,
  as = "h2",
  style,
  className = "",
}: HeadingProps) {
  const allowedTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const ElementType = allowedTypes.includes(as) ? as : ("h2" as const);

  const classNames = cn(
    headerClasses({ size }),
    className,
    inter.className,
    "font-bold"
  );
  return (
    <ElementType className={classNames} style={style}>
      {children}
    </ElementType>
  );
}

export default Heading;
