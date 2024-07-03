import { InputWrapperProps } from "@/types/component.types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "@hookform/error-message";
import { get } from "react-hook-form";
import Button from "../button";
import Icon from "../icon";
import Spinner from "../spinner";

const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  name,
  label,
  isLoading = false,
  type = "text",
  errors,
  isShown,
  handleClick,
  inputIcon,
  ...props
}) => {
  const hasError = get(errors, name);
  const bgColor = hasError ? "bg-red-100" : props.bg ?? "bg-brand-lightest";
  const borderColor = hasError
    ? "border-red-400"
    : props.borderColor ?? "border-transparent";

  return (
    <div
      className={`relative w-full text-brand-darkest ${
        props.isDisabled ? "opacity-90" : "opacity-100"
      }`}
    >
      {label && (
        <label
          className="text-left text-[13px] capitalize text-brand-darkest"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div
        className={`relative flex h-11 items-center  overflow-hidden transition-colors duration-300 ${
          props.rounded ?? "rounded-[4px]"
        } border focus-within:border-brand-lightblue ${
          props.h ?? "h-11"
        } ${bgColor} ${borderColor} ${label ? "mt-1" : ""} ${
          type === "select" ? "cursor-not-allowed pr-1" : ""
        }`}
      >
        {inputIcon && (
          <Icon IconComp={inputIcon} boxSize={7} className="text-gray-300" />
        )}
        {/* The child input element which can be input, textarea, select etc */}
        {children}
        {/* To indicate loading, usefull when input default value is gotten from the server */}
        {isLoading && (
          <div className={`absolute right-1 top-3 ${bgColor}`}>
            <Spinner />
            {/* <ClipLoader
              color="#003B65"
              size={20}
              loading={true}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> */}
          </div>
        )}
        {/* Icon used to indicate error state */}

        {/* password type switcher use to toggle password fields */}

        {type === "password" && !isLoading && (
          <Button
            variant="secondary"
            className="border-0 px-[12px] outline-none focus:border-0 focus:ring-0 focus:ring-transparent"
            onClick={handleClick}
          >
            {isShown ? (
              <Icon IconComp={EyeSlashIcon} className="text-brand-darkest" />
            ) : (
              <Icon IconComp={EyeIcon} className="text-brand-darkest" />
            )}
          </Button>
        )}
      </div>
      {hasError && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            return (
              <div className="absolute -bottom-4 right-0">
                <p className="text-xs font-semibold text-red-600">{message}</p>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputWrapper;
