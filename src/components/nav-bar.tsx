"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/slices/userSlice";
import Image from "next/image";
const dropDownList = [
  { label: "My Order", href: "myorder" },
  { label: "Logout", href: "logout" },
];
const sideMenuList = [
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];
export default function Navbar({ cartCount }: any) {
  const [isOpen, setOpen] = useState(false);
  const [showDropDown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  const onClose = () => {
    setOpen(false);
  };

  const onClickItem = (href: string) => {
    if (href == "logout") {
      dispatch(logOut());
    } else if (href === "myorder") {
      router.push("/myorder");
    }
  };
  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && lastScrollY > 10) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  const onClickSideBarItem = (link: string) => {
    if (link == "logout") {
      dispatch(logOut());
    } else if (link === "myorder") {
      router.push("/myorder");
    }
  };

  return (
    <div
      className={` bg-white border border-y-1 fixed z-40 flex-none w-full transition-transform duration-300 transform ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Sidebar open={isOpen} onClose={onClose} />
      {/* <header className="relative bg-white"> */}
      {/* <p className="flex h-10 items-center justify-center bg-slate-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹100
        </p> */}
      <div className="flex h-14 justify-between items-center bg-white px-4">
        <div>
          <button
            type="button"
            className={`${
              isOpen ? "hidden" : "visible"
            } z-50 rounded-md bg-white p-2 text-gray-400 lg:hidden`}
            onClick={() => setOpen(true)}
          >
            <Bars3Icon className="h-8 w-8 text-slate-900" aria-hidden="true" />
          </button>
          <div className="hidden lg:flex lg:flex-1 lg:items-center">
            <ul role="list" className="flex  space-x-3">
              {sideMenuList.map((item) => (
                <li
                  key={item.name}
                  className="flow-root cursor-pointer"
                  onClick={() => onClickSideBarItem(item?.href)}
                >
                  <p className="font-medium text-slate-900">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex">
          <Image
            alt="abc"
            src="/logo_background.svg"
            height={160}
            width={160}
          />
        </div>
        <div className="lg:hidden">
          <Image
            alt="abc"
            src="/logo_background.svg"
            height={130}
            width={130}
          />
        </div>
        <div>
          <div className="ml-auto flex items-center">
            {/* Search */}
            <div className="lg:ml-6">
              <a href="#" className=" text-gray-400 hover:text-gray-500">
                <MagnifyingGlassIcon
                  className="h-8 w-8 text-slate-900"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Cart */}
            <div className="hidden ml-2 lg:flex">
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
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              {Object.keys(user).length > 0 ? (
                <div className="flow-root text-center">
                  <div className="flex flex-row">
                    <p className="text-sm font-medium text-gray-700">
                      Welcome
                      <span className="pl-1 mr-2 text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>{" "}
                    </p>
                    <UserCircleIcon
                      className="h-6 w-6 cursor-pointer"
                      aria-hidden="true"
                      onClick={(e) => {
                        setShowDropdown(!showDropDown);
                      }}
                    />
                  </div>

                  <div
                    className={` 
                      hidden absolute  lg:${
                        !showDropDown ? "hidden" : "flex"
                      } `}
                  >
                    <div
                      id="dropdownHover"
                      className="z-30 mt-5 bg-white divide-y divide-gray-100 rounded-sm shadow w-44 "
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownHoverButton"
                      >
                        {dropDownList.map((item) => (
                          <li
                            key={item.label}
                            className="flow-root py-2 divide-y-2"
                            onClick={(e) => {
                              e.preventDefault();
                              onClickItem(item.href);
                            }}
                          >
                            <a
                              href={item.href}
                              className="font-medium text-gray-900"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  <UserCircleIcon
                    className="h-8 w-8 text-slate-900 cursor-pointer"
                    aria-hidden="true"
                  />
                </Link>
              )}
              {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
