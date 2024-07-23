import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


const OrderSummery = ({  cartTotal, deliveryFees,onClickButton ,buttonTitle}: any) => {
    const router = useRouter();
  return (
    <>
     <div className=" flex flex-col justify-center mt-2 lg:mt-0">
            <div className="p-4 bg-white flex flex-col justify-center lg:mb-1 border">
              <div className="flex item-center mb-2">
                <Image alt="abc" src="/discount.png" width={30} height={30} />
                <h2 className="items-baseline font-normal pt-1">
                  Coupons and offers
                </h2>
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="appearance-none block w-64 bg-white text-gray border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <button className="bg-slate px-2 h-11 w-32 rounded text-base font-medium text-white shadow-sm ml-2">
                  Apply
                </button>
              </div>
            </div>
            <div className="mt-2 p-4 flex flex-col  bg-white border">
            <div className="divide-y divide-dashed">
              <div>
                <div className="flex py-1 justify-between items-baseline  text-slate">
                  <h2 className="font-normal">Item total</h2>
                  <div className="flex items-center">
                    <h3 className="font-normal line-through pl-1 text-gray">{`₹${Number(
                      Number(cartTotal) + 100
                    )}`}</h3>
                    <h3 className="text-base pl-1 text-slate">{`₹${Number(
                      cartTotal
                    )}`}</h3>
                  </div>
                </div>
                <div className="flex pb-2 justify-between items-baseline  text-slate">
                  <h2 className="text-sm font-normal">Delivery fee</h2>
                
                  <h2 className="text-sm pl-1 text-slate font-normal"> {deliveryFees >0?`₹${deliveryFees}`:'free'}</h2>
                </div>
              </div>

              <div className="flex py-2 justify-between items-baseline font-base">
                <h2> Grand Total</h2>
                <h2>₹{parseInt(cartTotal+ 2)}</h2>
              </div>
              </div>
              <div>
              <div className="flex py-3 font-normal text-gray">
                <h2 className="text-slate text-sm font-normal">
                  Average delivery time
                  <span className="font-sbase"> 6-7 days</span>
                </h2>
              </div>
              <div className="flex bg-green-100 rounded-sm divide-dashed!important justify-center h-8 items-center">
                <h3 className="text-green-500 mb-[2px]">
                  ₹26 saved so far on this order
                </h3>
              </div>
              <div
                onClick={onClickButton}
                className="hidden cursor-pointer mx-3 lg:flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate my-2"
              >
                <h1 className="text-base">{buttonTitle}</h1>
                <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
              </div>
              </div>
              </div>
            </div>
    </>
  );
};
export default OrderSummery;
