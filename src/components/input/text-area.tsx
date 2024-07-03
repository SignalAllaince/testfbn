import { cn } from "@/lib/utils/component.utils";
import { InputWrapperProps } from "@/types/component.types";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import InputWrapper from "./input-wrapper";
export type Ref = HTMLTextAreaElement;

const inputClasses = cva(
  [
    "focus:ring-0",
    "transition",
    "font-light",
    "duration-200",
    "ease-in-out",
    "px-4",
    "outline-none",
    "w-full",
    "h-full",
    "text-sm",
    "border-0",
    "text-brand-darkest",
    "placeholder:text-brand-medium",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-transparent", "text-slate-600"],
        secondary: ["bg-gray-100", "text-slate-900"],
      },
      inputSize: {
        xs: ["h-6", "text-xs", "py-0"],
        sm: ["h-8", "text-sm", "py-2"],
        md: ["h-10", "!text-md", "py-2"],
        lg: ["h-12", "text-lg", "py-2"],
      },
    },
    defaultVariants: {
      variant: "primary",
      inputSize: "md",
    },
  }
);

// below here we just extended our input base interface and VariantProps interface which we imported from CVA
export interface InputProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    VariantProps<typeof inputClasses> {
  isLoading?: boolean;
}

const Textarea = React.forwardRef<
  Ref,
  Omit<InputProps, "type"> & InputWrapperProps
>(
  (
    {
      value,
      onChange,
      name = "",
      type = "text",
      onBlur,
      placeholder,
      isDisabled,
      className = "",
      cols = 40,
      variant,
      inputSize,
      h = "min-h-[90px]",
      ...others
    },
    ref
  ) => {
    return (
      <InputWrapper
        type={type}
        isDisabled={isDisabled}
        name={name}
        h={h}
        {...others}
      >
        <textarea
          name={name}
          onChange={onChange}
          value={value}
          id={name}
          cols={cols}
          ref={ref}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(className, inputClasses({ variant, inputSize }))}
        />
      </InputWrapper>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
