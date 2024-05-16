"use client";
import { useState } from "react";
import {
  ArrowLeftIcon,
  PlusIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIcon2 } from "@heroicons/react/24/solid";
import "react-spring-bottom-sheet/dist/style.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import PaymentFooter from "@/components/paymentFooter";
import Link from "next/link";
const address = [
  {
    _id: "123",
    name: "Manoj Soni",
    mobile: "91234478",
    pincode: "125001",
    address: "abz colony",
    city: "hisar",
    state: "Haryana",
    selected: true,
  },
  // {
  //   _id: "124",
  //   name: "Surya Kumar",
  //   mobile: "95234478",
  //   pincode: "122006",
  //   address: "basai road",
  //   city: "gurgaon",
  //   state: "Haryana",
  //   selected: false,
  // },
];
export default function Checkout() {
  const dispatch = useDispatch();
  const [allAddress, SetAllAddress] = useState(address);
  const [selectedIndex, SetSelectedIndex] = useState(0);

  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  console.log("cart", cart);

  const onSelectAddress = (index: any) => {
    SetSelectedIndex(index);
  };

  return (
    <div className="bg-slate-50 flex-1 flex-col flex-grow pb-36">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12 justify-between flex-1">
        <div className="ml-1 flex h-7 items-center ">
          <button
            type="button"
            className="z-50 px-2 text-gray-400"
            onClick={(e) => {
              router.back();
            }}
          >
            <span className="sr-only">Close panel</span>
            <ArrowLeftIcon className="h-6 w-5 text-black" aria-hidden="true" />
          </button>
          <h1 className="font-normal">Select Address</h1>
        </div>
        <div className="flex items-center h-7">
          <h1 className="font-normal text-sm"> STEP 2/3</h1>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex lg:flex-1 lg:px-10">
        {allAddress?.length > 0 ? (
          <div className="flex flex-col lg:flex-row">
            <div className="mt-8 px-3 lg:flex flex-1  ">
              <div className="flow-root lg:flex flex-1 ">
                <ul role="list" className="my-2 lg:flex-1">
                  {allAddress.map((item: any, index: number) => (
                    <li
                      key={item._id}
                      className="flex py-2 px-2 rounded-md mb-1 bg-white"
                    >
                      <button
                        type="button"
                        className="font-medium text-slate-800 h-6 w-6 mt-1"
                        onClick={() => onSelectAddress(index)}
                      >
                        {selectedIndex === index ? (
                          <CheckCircleIcon2
                            className="h-6 w-6 text-slate-700"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckCircleIcon
                            className="h-6 w-6 text-slate-700"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                      <div className="ml-2 flex flex-1 flex-col justify-evenly">
                        <div className="flex font-serif text-base font-medium text-slate-900">
                          <h3>{item?.name}</h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-700">{`${item.address}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{`${item.city}, ${item.state}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{`${item?.mobile}`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href={`/address`}>
              <div className="flex mt-2 py-3  w-full items-center text-center bg-white justify-center">
                <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
                <p className=" text-slate-900 font-medium text-lg">
                  Add new address
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <Link href={`/address`}>
            <div className="flex mt-2 py-3  w-full items-center text-center bg-white justify-center">
              <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
              <p className=" text-slate-900 font-medium text-lg">
                Add new address
              </p>
            </div>
          </Link>
        )}
      </div>
      <>
        <div className="p-4 mt-2 bg-white flex flex-col justify-center">
          <div className="flex item-center mb-2">
            <Image alt="abc" src="/discount.png" width={30} height={30} />
            <h2 className="items-baseline  font-normal pt-1 ">
              Coupons and offers
            </h2>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="appearance-none block w-64 bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            <button className="bg-slate-900 px-2 h-11 w-32 rounded text-base font-medium text-white shadow-sm ml-2">
              Apply
            </button>
          </div>
        </div>

        <div className="mt-2 p-4 flex flex-col divide-y divide-dashed lg:w-1/3 bg-white ">
          <div>
            <div className="flex py-1 justify-between items-baseline  text-slate-900">
              <h2 className="text-sm">Item total</h2>
              <div className="flex items-center">
                <h3 className=" text-xs line-through pl-1 text-gray-600 italic">{`₹${Number(
                  Number(cart?.total) + 100
                )}`}</h3>
                <h3 className="text-sm pl-1 text-slate-900 italic">{`₹${Number(
                  cart?.total
                )}`}</h3>
              </div>
            </div>
            <div className="flex pb-2 justify-between items-baseline  text-gray-900">
              <h2 className="text-sm">Delivery fee</h2>
              <h2 className="text-sm pl-1 text-slate-900 italic">₹2.00</h2>
            </div>
          </div>

          <div className="flex  py-2 justify-between items-baseline  font-base font-medium text-gray-900">
            <h2 className="text-sm"> Grand Total</h2>
            <h2 className="text-sm italic">₹{parseInt(cart?.total + 2)}</h2>
          </div>
          <div className="flex  py-3 text-base font-normal text-gray-900">
            <h2 className="text-slate-700 font-sans text-sm">
              Average delivery time
              <span className="font-semibold"> 6-7 days</span>
            </h2>
          </div>
          <div className="flex  bg-green-100 rounded-sm justify-center h-8 items-center">
            <h3 className="text-green-500 mb-[2px]">
              ₹26 saved so far on this order
            </h3>
          </div>
          <div
            onClick={(e) => {
              router.push("/checkout");
            }}
            className="hidden cursor-pointer mx-3 lg:flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-900 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 my-2"
          >
            <h1 className="text-base">Checkout</h1>
            <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
          </div>
        </div>
        <PaymentFooter />
      </>
      <footer
        className="bg-white
              text-center
             fixed
             inset-x-0
             bottom-0
             lg:hidden
             p-2
             "
      >
        <div className="mx-3">
          <Link
            href={{
              pathname: "/payment",
              query: allAddress[selectedIndex], // the data
            }}
          >
            <button className=" bg-slate-900 px-2 h-11 w-full rounded text-base font-medium text-white shadow-sm ">
              Continue
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
