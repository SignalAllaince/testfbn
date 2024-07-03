import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { rubik } from "../fonts";

const buttonClasses = cva(
  [
    rubik.className,
    "items-center",
    "cursor-pointer",
    "gap-2",
    "flex",
    "relative",
    "focus:ring-blue-500",
    "focus:outline-none",
    "outline-none",
    "leading-6",
    "transition-all",
    "duration-300",
    "disabled:cursor-not-allowed",
    "disabled:opacity-70",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-brand-blue",
          "border-transparent",
          "hover:bg-brand-primary",
          "disabled:text-brand-grayt",
          "disabled:hover:bg-brand-blue",
          "focus:ring-2 active:ring-2",
          "focus:ring-offset-1 active:ring-offset-1",
          "focus:ring-brand-blue active:ring-brand-blue",
        ],
        secondary: [
          "bg-transparent",
          "border",
          "border-brand-blue",
          "text-brand-blue",
          "focus:border-brand-lightblue",
          "focus:text-brand-lightblue",
          "focus:ring-1",
          "disabled:opacity-50",
          // "disabled:border-[#E4E4EE]",
          // "disabled:text-[#E4E4EE]",
        ],
        warning: [
          "bg-brand-accent",
          "text-brand-darkest",
          "focus:ring-2 active:ring-2",
          "focus:ring-offset-1 active:ring-offset-1",
          "focus:ring-brand-accent active:ring-brand-accent",
        ],
        menu: [
          "bg-transparent",
          "text-brand-blue",
          "border-0",
          "focus:ring-2",
          "justify-start ",
        ],
        minimenu: ["bg-transparent", "text-white", "justify-start"],
        outline: [
          "border-0 px-[4px] text-white focus:text-white",
          "bg-transparent",
          "focus:ring-0",
          "hover:text-brand-accent",
          "focus:text-brand-accent",
        ],
        cart: ["border-0", "border-b", "bg-transparent", "focus:ring-0"],
      },
      size: {
        small: ["text-[13px]", "h-10", "px-5"],
        xs: ["text-xs", "h-8"],
        menu: ["text-[13px]", "h-12", "px-4"],
        medium: ["text-[15px]", "h-11", "px-8"],
        special: [
          "text-[13px]",
          "h-10",
          "px-2",
          "w-36",
          "rounded",
          "justify-between",
        ],
        "special-sm": [
          "text-[13px]",
          "h-10",
          "px-2",
          "w-28",
          "rounded",
          "justify-between",
        ],
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "secondary", "outline", "warning"],
        size: ["medium", "small"],
        className: "justify-center rounded-[4px]",
        // **or** if you're a React.js user, `className` may feel more consistent:
        // className: "uppercase"
      },
      {
        variant: ["secondary"],
        size: ["xs"],
        className: "border-brand-light rounded-[4px]",
      },
      {
        variant: "cart",
        size: "xs",
        className: "px-0 w-fit",
      },
      {
        variant: ["primary", "secondary", "outline", "minimenu", "menu"],
        size: "xs",
        className: "px-4",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonClasses> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  activeBg?: string;
  activeText?: string;
  spinnerColor?: string;
  isLoading?: boolean;
  textClass?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      variant,
      size,
      href,
      spinnerColor = "currentColor",
      textClass = "",
      isLoading = false,
      disabled,
      className = "",
      ...others
    },
    ref
  ) => {
    const classNames = cn(buttonClasses({ variant, size }), className);

    if (href) {
      return (
        // @ts-expect-error
        <Link href={href} ref={ref} className={classNames} {...others}>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </Link>
      );
    }
    return (
      <button
        type="button"
        ref={ref}
        className={classNames}
        {...others}
        disabled={isLoading || disabled}
      >
        {leftIcon && (
          <span
            style={{
              opacity: isLoading ? 0 : 1,
            }}
          >
            {leftIcon}
          </span>
        )}
        <span
          style={{
            opacity: isLoading ? 0 : 1,
          }}
          className={textClass}
        >
          {children}
        </span>
        {rightIcon && (
          <span
            style={{
              opacity: isLoading ? 0 : 1,
            }}
          >
            {rightIcon}
          </span>
        )}
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className={`h-5 w-5 animate-spin text-white`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill={`${spinnerColor}`}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
