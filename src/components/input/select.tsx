import { cn } from "@/lib/utils/component.utils";
import { InputWrapperProps } from "@/types/component.types";
import { VariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps } from "react";
import { inputClasses } from ".";
import InputWrapper from "./input-wrapper";
export type Ref = HTMLSelectElement;

export interface SelectProps
  extends DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    VariantProps<typeof inputClasses> {
  isLoading?: boolean;
}
const CustomSelect = React.forwardRef<Ref, SelectProps & InputWrapperProps>(
  (
    {
      value = undefined,
      onChange,
      name,
      onBlur,
      placeholder,
      options,
      className = "cursor-pointer",
      isDisabled,
      variant,
      inputSize,
      ...others
    },
    ref
  ) => {
    return (
      <InputWrapper
        type={"select"}
        isDisabled={isDisabled}
        name={name}
        {...others}
      >
        <select
          name={name}
          onChange={onChange}
          value={value}
          defaultValue={placeholder}
          id={name}
          ref={ref}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(className, inputClasses({ variant, inputSize }))}
          disabled={isDisabled}
        >
          <option hidden>{placeholder}</option>
          {options &&
            options.map((item) => (
              // @ts-expect-error
              <option value={item.value} key={item.label}>
                {item.label}
              </option>
            ))}
        </select>
      </InputWrapper>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
