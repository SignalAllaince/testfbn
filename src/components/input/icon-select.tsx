import { ErrorMessage } from "@hookform/error-message";
import { Rubik } from "next/font/google";
import React from "react";
import { UseFormSetValue, get } from "react-hook-form";
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  OnChangeValue,
  OptionProps,
  SelectInstance,
  StylesConfig,
} from "react-select";
import Icon, { HeroIconType } from "../icon";

export type Option = {
  label: string;
  value: string;
  icon: HeroIconType;
};

interface MultiSelectProps {
  placeholder: string;
  setValue: UseFormSetValue<any>;
  name: string;
  value: string;
  errors?: { [x: string]: unknown } | undefined;
  options?: Option[];
  defaultValue?: Option;
  label?: string;
  isLoading?: boolean;
  isMulti?: boolean;
}

type Ref = SelectInstance<Option>;

const fira = Rubik({
  subsets: ["cyrillic"],
  weight: ["300"],
  display: "swap",
  adjustFontFallback: false,
});

const IconCustomMultiSelect = React.forwardRef<Ref, MultiSelectProps>(
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
    },
    ref
  ) => {
    const hasError = get(errors, name);

    const handleChange = (newValue: OnChangeValue<Option, false>) => {
      console.log(newValue, "newValue");
      setValue(name, newValue?.value);
      // setValue(name, newValue);
    };

    const customStyles: StylesConfig<Option, true> = {
      control: (
        provided: CSSObjectWithLabel,
        state: ControlProps<Option, true, GroupBase<Option>>
      ) => ({
        ...provided,
        border: `1px solid ${
          hasError && !value
            ? "red"
            : `${state.isFocused ? "#05629F" : "transparent"}`
        }`,
        outline: "none",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        height: "45px",
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

    const CustomOption:
      | React.ComponentType<OptionProps<Option, true, GroupBase<Option>>>
      | undefined = ({ innerRef, data, innerProps }) => {
      return (
        <div
          ref={innerRef}
          {...innerProps}
          className={`${fira.className} flex cursor-pointer items-center justify-between border-b p-3 text-md text-inherit hover:bg-brand-lightest`}
        >
          <p className="text-brand-blue">{data.label}</p>
          <Icon className="text-brand-blue" IconComp={data.icon} />
        </div>
      );
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
            ref={ref}
            defaultValue={defaultValue}
            // @ts-expect-error
            onChange={handleChange}
            styles={customStyles}
            isLoading={isLoading}
            options={options}
            placeholder={placeholder}
            components={{
              // @ts-expect-error
              Option: CustomOption,
              SingleValue: ({ innerProps, data }) => (
                <div
                  {...innerProps}
                  className={`${fira.className} -mt-7 flex cursor-pointer items-center gap-3 text-inherit`}
                >
                  <p className="text-brand-blue">{data.label}</p>
                  <Icon className="text-brand-blue" IconComp={data.icon} />
                </div>
              ),
            }}
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

IconCustomMultiSelect.displayName = "IconCustomMultiSelect";

export default IconCustomMultiSelect;
