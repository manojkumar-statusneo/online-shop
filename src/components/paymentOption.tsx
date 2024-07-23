import React from "react";
import { CheckCircleIcon as CheckCircleIcon2 } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
const RadioButtonOption = ({
  options,
  selectedOption,
  onSelectOption,
}: any) => {
  return (
    <div>
      {options.map((option: any) => (
        <label
          key={option?.title}
          className="flex items-center mb-2 text-slate"
        >
          <button
            type="button"
            className="font-medium text-slate h-6 w-6 mt-1"
            onClick={() => onSelectOption(option)}
          >
            {selectedOption === option?.title ? (
              <CheckCircleIcon2
                className="h-6 w-6 text-slate"
                aria-hidden="true"
              />
            ) : (
              <CheckCircleIcon
                className="h-6 w-6 text-slate"
                aria-hidden="true"
              />
            )}
          </button>

          <span className="ml-2  border rounded ">{option?.image}</span>
          <span className="ml-2 font-normal text-slate">
            {option?.title}
          </span>
        </label>
      ))}
    </div>
  );
};
export default RadioButtonOption;
