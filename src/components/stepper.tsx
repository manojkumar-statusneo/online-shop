import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
const Stepper = ({ currentStep, complete, steps }: any) => {
  return (
    <>
      <div className="flex flex-1">
        {steps?.map((step: any, i: number) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <CheckIcon
                  className="h-6 w-6 text-black font-bold"
                  aria-hidden="true"
                />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
