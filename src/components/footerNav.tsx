import React from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import {
  BriefcaseIcon,
  CircleStackIcon,
  HomeIcon,
  PlayCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";

const FooterNav = ({
  onDismiss,
  open,
  setOpen,
  router,
  total,
  cartCount,
}: any) => {
  return (
    <div className="lg:hidden">
      <footer
        className="bg-white
              text-center
             fixed
             border
             border-t-1
             inset-x-0
             bottom-0 px-4"
      >
        <div className="mt-2 flex justify-between px-2">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900">
              <HomeIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-slate-900"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold">Home</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900">
              <BriefcaseIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-slate-900"
                aria-hidden="true"
              />

              <p className="font-sans text-sm font-semibold">Shop</p>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900 relative">
              <ShoppingBagIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-slate-900"
                aria-hidden="true"
              />
              <span className="absolute pt-[1px] ml-6  w-5 h-5 text-xs font-bold text-white bg-slate-900 rounded rounded-xl group-hover:text-slate-950">
                {cartCount}
              </span>
              <p className="font-sans text-sm font-semibold">Cart</p>
            </div>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900">
              <UserIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-slate-900"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold">Account</p>
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
      {/* <BottomSheet
        open={true}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight * 0.8}
        snapPoints={({ maxHeight }) => maxHeight * 0.35}
      >
        <div className="flex items-center flex-col pb-2">
          <p className="text-lg font-medium px-4 text-center">Sign In</p>
          <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-slate-900 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-first-name"
            >
              Mobile Number
            </label>
            <div className="flex flex-row  w-full bg-white text-slate-900 border rounded py-3 px-4 mb-2">
              <p className=" text-slate-900 mr-2">+91</p>
              <input
                className="appearance-none block w-full bg-white text-slate-900 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Mobile Number"
                onChange={(e) => console.log(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </div>
            <p className="text-xs text-gray-700">
              We will send you an SMS with a verification code.
            </p>
          </div>
          <button className=" mt-3 py-2 px-4 border rounded-md text-white bg-slate-900">
            Send OTP
          </button>
        </div>
      </BottomSheet> */}
      <BottomSheet
        open={false}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight * 0.8}
        snapPoints={({ maxHeight }) => maxHeight * 0.35}
      >
        <div className="flex items-center flex-col pb-2">
          <p className="text-lg font-medium px-4 text-center">Sign In</p>
          <div className="absolute end-2 top-2">
            <XMarkIcon
              // onClick={() => setOpen(true)}
              className="h-6 w-6 font-bold text-gray-500"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs text-gray-700 my-3">
            Enter 6-Digit OTP sent to +918529991515
          </p>
          <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-1">
              <div className="w-12 h-12 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-12 h-12 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-12 h-12 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-12 h-12 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <button className="cursor-pointer mt-4 py-2 px-4 border rounded-md text-white bg-slate-900">
            Verify
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};
export default FooterNav;
