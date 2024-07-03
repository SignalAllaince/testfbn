import Icon from "@/components/icon";
import { cn } from "@/lib/utils/component.utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Requirements() {
  const [maxRequirementArr, setRequirementArr] = useState(maxRequirement);
  const [minRequirementArr, setMinRequirementArr] = useState(minRequirement);

  const handleToggle = (index: number) => {
    setRequirementArr((prevState) => {
      const updatedRequirements = prevState.map((requirement, i) => {
        if (i === index) {
          return {
            ...requirement,
            isSelected: !requirement.isSelected,
          };
        }
        return requirement;
      });
      return updatedRequirements;
    });
  };

  const handleToggleMin = (index: number) => {
    setMinRequirementArr((prevState) => {
      const updatedRequirements = prevState.map((requirement, i) => {
        if (i === index) {
          return {
            ...requirement,
            isSelected: !requirement.isSelected,
          };
        }
        return requirement;
      });
      return updatedRequirements;
    });
  };

  return (
    <div className="mt-6 flex space-x-5 text-obs-blue">
      <div>
        <p className="text-sm font-medium">
          Minimum Requirements{" "}
          <span className="text-xs font-normal text-obs-light">
            (Select all applicable options)
          </span>
        </p>

        <div className="space-y-3 pt-3">
          {maxRequirementArr.map((requirement, index) => (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className="flex cursor-pointer items-start gap-3"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "ring-brand-blue",
                  requirement.isSelected ? "ring-2" : "",
                  requirement.isSelected ? "bg-brand-blue" : "",
                  "relative mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 border-brand-blue border-opacity-80  ring-offset-1 focus:outline-none"
                )}
              >
                {requirement.isSelected && (
                  <Icon IconComp={CheckIcon} className="text-white" />
                )}
              </span>
              <p className="text-sm font-light">{requirement.requirement}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium">
          Minimum Requirements{" "}
          <span className="text-xs font-normal leading-[12px] text-obs-light">
            (Select all applicable options)
          </span>
        </p>
        <div className="space-y-3 pt-3">
          {minRequirementArr.map((requirement, index) => (
            <div
              key={index}
              onClick={() => handleToggleMin(index)}
              className="flex cursor-pointer items-start gap-3"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "ring-brand-blue",
                  requirement.isSelected ? "ring-2" : "",
                  requirement.isSelected ? "bg-brand-blue" : "",
                  "relative mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 border-brand-blue border-opacity-80  ring-offset-1 focus:outline-none"
                )}
              >
                {requirement.isSelected && (
                  <Icon IconComp={CheckIcon} className="text-white" />
                )}
              </span>
              <p className="text-sm font-light">{requirement.requirement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const maxRequirement = [
  {
    requirement:
      "This is minimum user requirement 1 for  this discount and select all necessary options",
    isSelected: true,
  },
  {
    requirement:
      "This is minimum user requirement 999 for  this discount and select all necessary options",
    isSelected: true,
  },
];

const minRequirement = [
  {
    requirement:
      "This is minimum user requirement 1 for  this discount and select all necessary options",
    isSelected: true,
  },
  {
    requirement:
      "This is minimum user requirement 222 for  this discount and select all necessary options",
    isSelected: true,
  },
];
