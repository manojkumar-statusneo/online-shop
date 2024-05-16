"use client";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddressForm from "@/components/address-form";
export default function Address() {
  const router = useRouter();
  const [fullAddress, setFullAddress] = useState({
    name: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    country: "",
    mobile: "",
  });
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
    <div className="flex flex-col flex-1 overflow-y-auto pb-10 bg-slate-50">
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
          <h1 className="font-normal">Create Address</h1>
        </div>
        <div className="flex items-center h-7">
          {/* <h1 className="font-normal text-sm"> STEP 2/3</h1> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:mx-10">
        <div className="flex-col lg:flex lg:col-span-2">
          <div>
            <AddressForm
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
            />
          </div>
        </div>
      </div>

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
          <Link href={`/checkout`}>
            <button className=" bg-slate-900 px-2 h-11 w-full rounded text-base font-medium text-white shadow-sm ">
              Save Address
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
