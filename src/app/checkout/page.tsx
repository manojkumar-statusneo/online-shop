"use client";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import Stepper from "@/components/stepper";
import AddressForm from "@/components/address-form";
const steps = ["Address", "Shipping Info", "Payment"];
export default function Checkout() {
  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  const [currentStep, setCurrentStep] = useState(1);
  const [fullAddress, setFullAddress] = useState({
    name: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    country: "",
    mobile: "",
  });
  const [complete, setComplete] = useState(false);
  console.log("fullAddress", fullAddress);
  const fetchDataByPincode = async () => {
    const data = await fetch(
      `https://api.postalpincode.in/pincode/${fullAddress?.pinCode}`
    );
    const res = await data.json();
    const postalDetail = res.length && res[0].PostOffice[0];
    setFullAddress({
      ...fullAddress,
      city: postalDetail?.Block,
      state: postalDetail?.State,
    });
    console.log("response****", res.length && res[0].PostOffice[0]);
  };
  useEffect(() => {
    if (fullAddress?.pinCode.length === 6) {
      fetchDataByPincode();
    }
  }, [fullAddress?.pinCode]);
  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-20">
      <div className=" bg-slate-50 sticky top-0 z-50 overflow-hidden">
        <div className="flex items-start p-2 mb-3 bg-white py-3">
          <div className="ml-1 flex h-7 items-center">
            <button
              type="button"
              className="z-50 px-2 text-gray-400"
              onClick={(e) => {
                router.back();
              }}
            >
              <span className="sr-only">Close panel</span>
              <ArrowLeftIcon
                className="h-6 w-5 text-black"
                aria-hidden="true"
              />
            </button>
          </div>
          <h1 className="font-normal"> Checkout</h1>
        </div>
        <div className="hidden">
          <Stepper
            currentStep={currentStep}
            complete={complete}
            steps={steps}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:mx-10">
        <div className="flex-col  lg:flex lg:col-span-2">
          <Stepper
            currentStep={currentStep}
            complete={complete}
            steps={steps}
          />
          <div>
            <AddressForm
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
            />
          </div>
        </div>
        <div className="hidden my-6 p-2 flex-col divide-y divide-dashed lg:flex">
          <div>
            <div className="flex py-1 justify-between items-baseline text-base font-normal text-gray-900">
              <h2>Subtotal</h2>
              <h2>₹{cart?.total}</h2>
            </div>
            <div className="flex pb-2 justify-between items-baseline text-base font-normal text-gray-900">
              <h2>Delivery fee</h2>
              <h2>₹2.00</h2>
            </div>
          </div>

          <div className="flex  py-2 justify-between items-baseline  font-base font-medium text-gray-900">
            <h2 className="font-sans"> Grand total</h2>
            <h2>₹ {parseInt(cart?.total + 2)}</h2>
          </div>
          <div className="flex px-3 py-3 text-base font-normal text-gray-900">
            <h2 className="text-slate-700 font-sans text-sm">
              {" "}
              Avarage delivery time{" "}
              <span className="font-semibold"> 6-7 days</span>
            </h2>
          </div>
          <div className="flex  mx-3 bg-green-100 rounded-sm justify-center p-1 text-base font-normal text-gray-900 ">
            <h2 className="text-green-500"> ₹26 saved so far on this order </h2>
          </div>
          <Link
            href={{
              pathname: "/shipping-info",
              query: fullAddress, // the data
            }}
          >
            <div className="hidden cursor-pointer mx-3 lg:flex  gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 my-2">
              <h1 className="text-base">Next</h1>
              <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </div>

      <footer
        className="bg-slate-50
              text-center
             fixed
             inset-x-0
             bottom-0
             lg:hidden
             "
      >
        <div className="mt-2 flex justify-end px-2">
          <div className="flex flex-1 items-center gap-2 ">
            <div className="flex flex-col items-baseline   text-gray-900">
              <p className="font-sans font-semibold text-lg"> Total</p>
              <p className="font-normal text-base">₹262.00</p>
            </div>
          </div>
          <Link
            href={{
              pathname: "/shipping-info",
              query: fullAddress, // the data
            }}
          >
            <div className="flex w-44  justify-center border border-transparent bg-slate-800 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900">
              <h1 className="text-base">Next</h1>
              <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
