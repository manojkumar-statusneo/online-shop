import React from "react";

import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const PaymentFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center h-18 bg-[#fff] mt-2 py-2 border
             border-t-1 border-b-0">
      <div className="flex flex-row gap-2">
        <Image alt="abc" src="/master.svg" height={30} width={30} />
        <Image alt="visa" src="/visa.svg" height={30} width={30} />
        <Image alt="upi" src="/upi.svg" height={30} width={30} />
      </div>
      <div className="flex flex-1 gap-1 items-center">
        <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
        <h2 className="text-slate font-sans text-xs pt-1">
          100%
          <span className="font-semibold text-xs uppercase">
            {" "}
            secured payments
          </span>
        </h2>
      </div>
    </div>
  );
};
export default PaymentFooter;
