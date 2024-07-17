import { ArrowLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const DetailHeader = ({ title, cartCount }: any) => {
  const router = useRouter();
  return (
    <div className="bg-[#fff] sticky top-0 z-50 overflow-hidden ">
      <div className="flex items-start p-2  bg-white py-3 w-full justify-between">
        <div className="ml-1 flex h-7 items-center">
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
          <h1 className="font-normal"> {title}</h1>
        </div>
        <div className="ml-2 lg:flex">
          <Link href="/cart" className=" flex items-center ">
            <ShoppingBagIcon
              className="h-8 w-8 text-slate-900"
              aria-hidden="true"
            />
            <span className="absolute  pl-[12px] pt-2  text-sm font-bold text-slate-700 group-hover:text-slate-950">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DetailHeader;
