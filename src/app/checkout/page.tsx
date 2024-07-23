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
import OrderSummery from "@/components/order-summery";

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
            className="z-50 px-2 text-gray"
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
        <h1 className="text-slate font-medium text-xl">Select Delivery Address</h1>
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
                        className="font-medium text-slate h-6 w-6 mt-1"
                        onClick={() => onSelectAddress(index)}
                      >
                        {selectedIndex === index ? (
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
                      <div className="ml-2 flex flex-1 flex-col justify-evenly">
                        <div className="flex font-serif text-base font-medium text-slate">
                          <h3>{item?.name}</h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray">{`${item.address}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray">{`${item.city}, ${item.state}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray">{`+91${item?.phoneNo}`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <Link href={`/address`}>
              <div className="hidden  mt-2 py-3  w-full items-center text-center bg-white justify-center lg:flex">
                <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
                <p className=" text-slate font-medium text-lg">
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
                <p className=" text-slate font-medium text-lg">
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
              <p className=" text-slate font-medium text-lg">
                Add new address
              </p>
            </div>
          </Link>
          </div>
        )}

           <OrderSummery
            cartTotal ={cart?.total}
            deliveryFees={0}
            buttonTitle='Continue'
            onClickButton={()=>{
              router.push('/payment')
            }}
            />
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
            className=" bg-slate px-2 h-11 w-full rounded text-base font-medium text-white shadow-sm ">
              Continue
            </button>
          
        </div>
      </footer>
    </div>
  );
}
