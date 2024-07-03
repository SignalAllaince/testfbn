import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { rubik } from "../fonts";

const badgeClasses = cva(
  [
    "capitalize",
    "rounded-full",
    rubik.className,
    "w-fit",
    "mx-auto",
    "font-medium",
  ],
  {
    variants: {
      variant: {
        PaymentReceived: ["text-white", "bg-[#47C96B]"],
        Shipping: ["text-white", "bg-[#47C96B]"],
        Invoiced: ["text-white", "bg-[#47C96B]"],
        Shipped: ["text-white", "bg-[#47C96B]"],
        Complete: ["text-white", "bg-[#47C96B]"],
        Refunded: ["text-white", "bg-yellow-700"],
        PendingPayment: ["text-white", "bg-yellow-700"],
        New: ["text-white", "bg-[#506473]"],
        PendingCheckout: ["text-white", "bg-[#506473]"],
        PaymentFailed: ["text-white", "bg-[#879AA8]"],
        OutOfStock: ["text-white", "bg-[#879AA8]"],
        Cancelled: ["text-white", "bg-[#879AA8]"],
        Closed: ["text-white", "bg-[#879AA8]"],
        Deleted: ["text-white", "bg-[#879AA8]"],
        AdminCancelled: ["text-white", "bg-[#879AA8]"],
        AdminDeleted: ["text-white", "bg-[#879AA8]"],
      },
      size: {
        sm: ["text-[10px]", "py-1", "px-2"],
      },
    },
    defaultVariants: {
      variant: "PendingCheckout",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    VariantProps<typeof badgeClasses> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant, size, className = "", ...others }, ref) => {
    const classNames = cn(badgeClasses({ variant, size }), className);

    return (
      <div ref={ref} className={classNames} {...others}>
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
