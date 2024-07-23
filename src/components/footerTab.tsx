import React from "react";
import {
  ChevronRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import "react-spring-bottom-sheet/dist/style.css";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const FooterTab = ({
  router,
  total,
  onlyMenu,
  activeTab,
  cartCount,
  onClickCheckout
}: any) => {
  const user = useSelector((state: any) => state.user.user);
  const isLoggedIn = user?.mobile ? true : false;
  let isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (!isMobile) {
    return (
      <div>
        <div
          className="pt-1 flex justify-between px-2 items-center w-full gap-4 pb-2 
            "
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray hover:text-gray w-full py-2 px-3 items-center rounded-full"
          >
            <div className="flex items-center  text-gray self-center justify-center">
              <HomeIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-gray"
                aria-hidden="true"
              />
              <p className="text-sm text-gray pl-1">Home</p>
            </div>
          </Link>

          <Link
            href="/cart"
            className={`text-sm font-medium text-gray hover:text-gray w-full py-2 px-3 items-center rounded-full ${
              activeTab == "cart" ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-center relative self-center justify-center">
              <ShoppingBagIcon
                // onClick={() => setOpen(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "cart" ? "text-primary" : "text-gray"
                }`}
                aria-hidden="true"
              />
              <span className="absolute pt-[1px] pl-[4px] pb-2 mr-6 mb-3 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-xl group-hover:text-slate-950">
                {cartCount ?? ""}
              </span>
              <p
                className={`text-sm  pl-2 ${
                  activeTab == "cart" ? "text-primary" : "text-gray"
                }`}
              >
                Cart
              </p>
            </div>
          </Link>
          {isLoggedIn ? (
            <Link
              href="/login"
              className={`text-sm font-medium text-gray hover:text-gray  w-full py-2 px-3 items-center rounded-full self-center" ${
                activeTab == "account" ? "bg-blue-50" : ""
              }`}
            >
              <div className="cursor-pointer flex items-center  text-gray self-center justify-center">
                <UserIcon
                  // onClick={() => setOpen(true)}
                  className={`h-6 w-6 font-bold ${
                    activeTab == "account" ? "text-primary" : "text-gray"
                  }`}
                  aria-hidden="true"
                />
                <p
                  className={`text-sm ${
                    activeTab == "account" ? "text-primary" : "text-gray"
                  }`}
                >
                  Account
                </p>
              </div>
            </Link>
          ) : (
            <div
              onClick={onClickCheckout}
              className=" cursor-pointer flex items-center  text-gray self-center justify-center"
            >
              <UserIcon
                className={`h-6 w-6 font-bold ${
                  activeTab == "account" ? "text-primary" : "text-gray"
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-sm ${
                  activeTab == "account" ? "text-primary" : "text-gray"
                }`}
              >
                Account
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="lg:hidden">
      <footer
        className="
              text-center
             fixed
             inset-x-0
             bottom-0"
      >
        {!onlyMenu && (
          <div
            className="mt-2 flex justify-between px-2 py-2 border
             border-b-[0.5px] bg-white"
          >
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-baseline flex-col">
                <h2 className="font-medium text-slate text-lg">
                  ₹{total?.toLocaleString()}
                </h2>
                <h3 className="text-sm font-semibold text-primary">
                  Payable Amount
                </h3>
              </div>
            </div>
            <div
              onClick={(e) => {
                if(isLoggedIn){
                  router.push("/checkout");
                }
                else {
                  onClickCheckout()
                }
               
              }}
              className="cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-slate rounded-md"
            >
              <h1 className="text-md">Checkout</h1>
              <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
            </div>
          </div>
        )}
        <div
          className="pt-1 flex justify-between px-2 items-center w-full gap-4 pb-2 border
             border-t-[0.5px] bg-white"
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray hover:text-gray bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center  text-gray self-center justify-center">
              <HomeIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-gray"
                aria-hidden="true"
              />
              <p className="text-sm text-gray pl-1">Home</p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="text-sm font-medium text-gray hover:text-gray bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center relative self-center justify-center">
              <ShoppingBagIcon
                // onClick={() => setOpen(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "cart" ? "text-primary" : "text-gray"
                }`}
                aria-hidden="true"
              />
             {cartCount>0? <span className="absolute mr-12 mb-4 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-xl group-hover:text-slate-950">
                {cartCount}
              </span>:null}
              <p
                className={`text-sm  pl-1 ${
                  activeTab == "cart" ? "text-primary" : "text-gray"
                }`}
              >
                Cart
              </p>
            </div>
          </Link>
          {isLoggedIn ? (
            <Link
              href="/login"
              className="text-sm font-medium text-gray hover:text-gray bg-slate-100 w-full py-2 items-center rounded-full self-center"
            >
              <div className="flex items-center  text-gray self-center justify-center">
                <UserIcon
                  // onClick={() => setOpen(true)}
                  className={`h-6 w-6 font-bold ${
                    activeTab == "account" ? "text-primary" : "text-gray"
                  }`}
                  aria-hidden="true"
                />
                <p
                  className={`text-sm ${
                    activeTab == "account" ? "text-primary" : "text-gray"
                  }`}
                >
                  Account
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center  text-gray self-center justify-center">
              <UserIcon
                onClick={onClickCheckout}
                className={`h-6 w-6 font-bold ${
                  activeTab == "account" ? "text-primary" : "text-gray"
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-sm ${
                  activeTab == "account" ? "text-primary" : "text-gray"
                }`}
              >
                Account
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
export default FooterTab;
