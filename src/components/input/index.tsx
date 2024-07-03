import { cn } from "@/lib/utils/component.utils";
import { InputWrapperProps } from "@/types/component.types";
import { VariantProps, cva } from "class-variance-authority";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import InputWrapper from "./input-wrapper";
export type Ref = HTMLInputElement;

export const inputClasses = cva(
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
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputClasses> {
  isLoading?: boolean;
}

const CustomInput = React.forwardRef<
  Ref,
  InputProps & Omit<InputWrapperProps, "type">
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
      variant,
      inputSize,
      ...others
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
      <InputWrapper
        type={type}
        isDisabled={isDisabled}
        name={name}
        isShown={show}
        handleClick={handleClick}
        {...others}
      >
        <input
          name={name}
          type={type !== "password" ? type : show ? "text" : "password"}
          onChange={onChange}
          value={value}
          id={name}
          ref={ref}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(className, inputClasses({ variant, inputSize }))}
          min={others.min}
          max={others.max}
          disabled={isDisabled}
        />
      </InputWrapper>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
