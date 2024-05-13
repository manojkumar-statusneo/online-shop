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

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const dropDownList = [
  { label: "My Order", href: "myorder" },
  { label: "Logout", href: "logout" },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
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
    console.log("window.scrollY", window.scrollY);
    console.log("window.scrollY", lastScrollY);
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

  return (
    <div
      className={`bg-white border border-y-1 fixed z-40 flex-none w-full transition-transform duration-300 transform ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Sidebar open={isOpen} onClose={onClose} navigation={navigation} />
      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-slate-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹100
        </p> */}

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div
              className={
                "flex h-16 items-center justify-between bg-slate-500 w-full"
              }
            >
              <button
                type="button"
                className={` ${
                  isOpen ? "hidden" : "visible"
                } z-50 rounded-md bg-white p-2 text-gray-400 lg:hidden`}
                onClick={() => setOpen(true)}
              >
                <Bars3Icon
                  className="h-6 w-6 text-slate-900"
                  aria-hidden="true"
                />
              </button>

              {/* Logo */}
              <div className="ml-4 bg-red-100 lg:ml-0">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </div>

              <div className="ml-auto flex items-center bg-slate-300">
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <MagnifyingGlassIcon
                      className="h-6 w-6 text-slate-900"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="hidden ml-4 lg:flex">
                  <Link
                    href="/cart"
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 text-slate-900"
                      aria-hidden="true"
                    />
                    <span className="absolute pt-2 pl-[5px] ml-2 text-sm font-bold text-slate-950 group-hover:text-slate-950">
                      {cartCount}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              {/* {Object.keys(user).length > 0 ? (
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
                      hidden absolute lg:ml-8 lg:${
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
                      Sign in
                    </Link>
                  )} */}
              {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
