"use client";
import { useEffect, useState } from "react";
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
import { getAddress } from "@/services/productServices";
import NavBarDesktop from "@/components/nav-bar-desktop";
import { saveOrderAddress } from "@/lib/slices/orderSlice";

export default function Checkout() {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [allAddress, SetAllAddress] = useState([]);
  const [selectedIndex, SetSelectedIndex] = useState(0);

  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  console.log("ALLLLADRESSS", allAddress[selectedIndex]);

  const onSelectAddress = (index: any) => {
    SetSelectedIndex(index);
   
  };
const handleOnClick=()=>{
  dispatch(saveOrderAddress(allAddress[selectedIndex]))
  router.push('/payment')
}
  const fetchAddress = async () => {
    const productInfo = await getAddress(user?._id);
    SetAllAddress(
      productInfo?.data?.map((item: any) => {
        return {
          ...item,
          selected: false,
        };
      })
    );
  };
  useEffect(() => {
    if (user?._id) {
      fetchAddress();
    }
  }, [user]);
  return (
    <div className="bg-[#fff] flex-1 flex-col flex-grow pb-20 lg:pb-1">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12 justify-between flex-1 lg:hidden">
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
      <div className={`hidden lg:flex`}>
        <NavBarDesktop cartCount={cart?.cartCount} total={parseInt(cart?.total + 2)} screen="checkout" />
      </div>
      
      <div className="flex flex-col w-full lg:flex lg:flex-1 lg:px-28 mb-2">
      <div className="hidden lg:flex px-4 mt-8 lg:mb-2">
        <h1 className="text-slate-900 font-medium text-xl">Select Delivery Address</h1>
        </div>
      <div className="flex flex-col lg:flex-row lg:flex-1">
       
        {allAddress?.length > 0 ? (
          <div className="flex flex-col lg:flex-1">
            <div className="px-3 lg:flex lg:flex-1 ">
              <div className="flow-root lg:flex lg:flex-1">
                <ul role="list" className="my-2 lg:flex-1">
                  {allAddress.map((item: any, index: number) => (
                    <li
                      key={item._id}
                      className="flex py-2 px-2 rounded-md mb-1 border"
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
                          <p className="text-sm text-gray-700">{`+91${item?.phoneNo}`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <Link href={`/address`}>
              <div className="hidden  mt-2 py-3  w-full items-center text-center bg-white justify-center lg:flex">
                <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
                <p className=" text-slate-900 font-medium text-lg">
                  Add new address
                </p>
              </div>
            </Link>
                </ul>
              </div>
            </div>
            <Link href={`/address`}>
              <div className="flex mt-2 py-3  w-full items-center text-center bg-white justify-center lg:hidden">
                <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
                <p className=" text-slate-900 font-medium text-lg">
                  Add new address
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex w-full bg-white justify-center">
          <Link href={`/address`}>
            <div className="flex mt-2 py-3 px-3 border w-full text-center justify-center">
              <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
              <p className=" text-slate-900 font-medium text-lg">
                Add new address
              </p>
            </div>
          </Link>
          </div>
        )}

    
      <div className=" flex flex-col justify-center">
        <div className="p-4 mt-2 bg-white flex flex-col justify-center border">
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

        <div className="mt-2 p-4 flex flex-col divide-y divide-dashed  bg-white border">
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
           onClick={handleOnClick}
            className="hidden cursor-pointer mx-3 lg:flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-900 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 my-2"
          >
          
            <h1 className="text-base">Continue</h1>
            <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
          </div>
         
        </div>
       
      </div>
      </div>
      </div>
      <PaymentFooter />
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
          
            <button 
             onClick={handleOnClick}
            className=" bg-slate-900 px-2 h-11 w-full rounded text-base font-medium text-white shadow-sm ">
              Continue
            </button>
          
        </div>
      </footer>
    </div>
  );
}
