import { joinCategories } from "@/lib/utils/component.utils";
import { Option } from "@/types/component.types";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { UseFormSetValue, get } from "react-hook-form";
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  OnChangeValue,
  SelectInstance,
  StylesConfig,
} from "react-select";

// const colourOptions = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

interface MultiSelectProps {
  placeholder: string;
  setValue: UseFormSetValue<any>;
  name: string;
  value: string;
  errors?: { [x: string]: unknown } | undefined;
  options?: Option[];
  defaultValue?: Option[];
  label?: string;
  isLoading?: boolean;
  isMulti?: boolean;
}

type Ref = SelectInstance<Option>;

const CustomMultiSelect = React.forwardRef<Ref, MultiSelectProps>(
  (
    {
      placeholder,
      name,
      value,
      setValue,
      errors,
      label,
      defaultValue,
      isLoading = false,
      options,
      isMulti = true,
    },
    ref
  ) => {
    const hasError = get(errors, name);

    const handleChange = (newValue: OnChangeValue<Option, true>) => {
      if (newValue.length === 0) {
        setValue(name, "");
      }
      setValue(name, joinCategories(newValue as Option[]));
      // setValue(name, newValue);
    };

    const customStyles: StylesConfig<Option, true> = {
      //  @ts-expect-error
      control: (
        provided: CSSObjectWithLabel,
        state: ControlProps<
          { value: string; label: string },
          true,
          GroupBase<{ value: string; label: string }>
        >
      ) => ({
        ...provided,
        border: `1px solid ${
          hasError && !value
            ? "red"
            : `${state.isFocused ? "#05629F" : "transparent"}`
        }`,
        outline: "none",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        minHeight: "53px",
        borderRadius: "4px",
        fontSize: "0.85rem",
        background: `${hasError && !value ? "#fee2e2" : `#F5F8FA`}`,
      }),
      multiValue: (provided: CSSObjectWithLabel) => ({
        ...provided,
        borderRadius: "20px",
        background: "#DAE8F2",
        color: "#fff",
        overflow: "hidden",
        padding: "3px",
        fontSize: "0.9rem",
      }),
      option: (styles) => {
        return {
          ...styles,
          fontSize: "0.8rem",
        };
      },
    };

    return (
      <div className="space-y-1">
        <div className="space-y-1">
          {label && (
            <label
              className="text-left text-[13px] capitalize text-brand-darkest"
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <Select
            name={name}
            isMulti={isMulti}
            ref={ref}
            defaultValue={defaultValue}
            // @ts-expect-error
            onChange={handleChange}
            styles={customStyles}
            isLoading={isLoading}
            options={options}
            placeholder={placeholder}
          />
        </div>
        {hasError && !value && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="text-right">
                  <p className="text-xs text-red-500">{message}</p>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  }
);

CustomMultiSelect.displayName = "CustomMultiSelect";

export default CustomMultiSelect;
