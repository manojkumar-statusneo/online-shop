import React from "react";
import {
  ChevronRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";

const FooterTab = ({ router, total, onlyMenu, activeTab }: any) => {
  return (
    <div className="lg:hidden">
      <footer
        className="bg-white
              text-center
             fixed
             inset-x-0
             bottom-0 "
      >
        {!onlyMenu && (
          <div
            className="mt-2 flex justify-between px-2 py-2 border
             border-b-[0.5px]"
          >
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-baseline  text-gray-900">
                <p className="text-sm">Total: </p>
                <p className="text-sm">₹{total}</p>
              </div>
            </div>
            <div
              onClick={(e) => {
                router.push("/checkout");
              }}
              className="cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-900 rounded-md"
            >
              <h1 className="text-sm">Continue</h1>
              <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
            </div>
          </div>
        )}
        <div
          className="mt-2 flex justify-between px-2 items-center w-full gap-4 pb-2 border
             border-t-[0.5px] pt-1"
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center  text-gray-900 self-center justify-center">
              <HomeIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-gray-500"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-500 pl-1">Home</p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center relative self-center justify-center">
              <ShoppingBagIcon
                // onClick={() => setOpen(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "cart" ? "text-blue-700" : "text-gray-500"
                }`}
                aria-hidden="true"
              />
              <span className="absolute pt-[1px] mr-12 mb-3 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-xl group-hover:text-slate-950">
                {"1"}
              </span>
              <p
                className={`text-sm  pl-1 ${
                  activeTab == "cart" ? "text-blue-700" : "text-gray-500"
                }`}
              >
                Cart
              </p>
            </div>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full self-center"
          >
            <div className="flex items-center  text-gray-900 self-center justify-center">
              <UserIcon
                // onClick={() => setOpen(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "account" ? "text-blue-700" : "text-gray-500"
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-sm ${
                  activeTab == "account" ? "text-blue-700" : "text-gray-500"
                }`}
              >
                Account
              </p>
            </div>
          </Link>
          {/* <div
            onClick={(e) => {
              router.push("/checkout");
            }}
            className=" cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900"
          >
            <h1 className="text-base">Checkout</h1>
          </div> */}
        </div>
      </footer>
    </div>
  );
};
export default FooterTab;
