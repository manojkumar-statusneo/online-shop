"use client";
import { useState } from "react";
import {
  ArrowLeftIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import "react-spring-bottom-sheet/dist/style.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "@/lib/slices/cartSlice";
import FooterTab from "@/components/footerTab";
import NavBarDesktop from "@/components/nav-bar-desktop";
import Image from "next/image";
import PaymentFooter from "@/components/paymentFooter";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  console.log("cart", cart);
  const onDismiss = () => {
    setOpen(false);
  };

  const decreaseQty = (item: any) => {
    dispatch(removeToCart(item));
  };
  const increaseQty = (item: any) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-[#fff] flex-1 flex-col flex-grow pb-36 lg:pb-1">
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
          <h1 className="font-normal">Shopping Bag</h1>
        </div>
        <div className="flex items-center h-7">
          <h1 className="font-normal text-sm"> STEP 1/3</h1>
        </div>
      </div>
      <div className={`hidden lg:flex`}>
        <NavBarDesktop cartCount={cart?.cartCount} total={parseInt(cart?.total + 2)} screen="cart" />
      </div>
      <div className="flex flex-col w-full lg:flex lg:flex-1 lg:px-28 my-2">
        {cart?.cartCount > 0 ? (
          <div className="flex flex-col lg:flex-row">
            <div className="px-3 lg:flex flex-1 bg-white lg:mr-2">
              <div className="flow-root lg:flex flex-1 ">
                <ul role="list" className="lg:flex-1">
                  {cart?.cartProducts.map((product: any) => (
                    <li
                      key={product._id}
                      className="flex py-2 px-2 border lg:py-4s"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 lg:h-32 lg:w-32">
                        <img
                          src={product.images[0]}
                          alt={product.images[0]}
                          className="h-full w-full aspect-4 object-fill"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between w-[100%] font-josefin text-xs text-gray-900 lg:text-lg">
                            <h3>{product?.title}</h3>
                            <button
                              type="button"
                              className="font-medium text-slate-800"
                            >
                              <TrashIcon
                                className="h-6 w-5 text-slate-600"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div>

                          <div className="flex flex-row items-center">
                    <h3 className="text-xs lg:text-base">{`₹${product.price}`}</h3>
                    <h3 className="text-xs line-through pl-1 text-gray-800 italic lg:text-base">{`₹${Number(
                      Number(product.price) + 100
                    )}`}</h3>
                    <h3 className="text-xs pl-1  text-green-800">
                      {"(33% off)"}
                    </h3>
                  </div>
                        </div>
                        <div className="flex w-20 text-center font-serif text-base justify-evenly border-gray-400 border-[1px] p-1 mt-2">
                          <button
                            type="button"
                            onClick={() => decreaseQty(product)}
                            className="font-medium text-slate-800 hover:text-indigo-500"
                          >
                            <MinusIcon
                              className="h-4 w-4 text-slate-700"
                              aria-hidden="true"
                            />
                          </button>
                          <p className="text-gray-500 text-sm">{product.qty}</p>

                          <button
                            onClick={() => increaseQty(product)}
                            type="button"
                            className="font-medium text-slate-800 hover:text-indigo-500"
                          >
                            <PlusIcon
                              className="h-4 w-4 text-slate-700"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className=" flex flex-col justify-center mt-2 lg:mt-0">
            <div className="p-4 bg-white flex flex-col justify-center lg:mb-1 border">
              <div className="flex item-center mb-2">
                <Image alt="abc" src="/discount.png" width={30} height={30} />
                <h2 className="items-baseline font-normal pt-1">
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
                onClick={(e) => {
                  router.push("/checkout");
                }}
                className="hidden cursor-pointer mx-3 lg:flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-900 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 my-2"
              >
                <h1 className="text-base">Checkout</h1>
                <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
              </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen  my-2 flex-col  items-center text-center">
            <p className="font-medium text-2xl text-gray-600">
              {" "}
              Cart is empty{" "}
            </p>
          </div>
        )}
      </div>
      <PaymentFooter />
      <div className={`${cart?.cartCount == 0 && "hidden"} lg:hidden`}>
        <FooterTab
          onDismiss={onDismiss}
          open={open}
          setOpen={setOpen}
          router={router}
          total={parseInt(cart?.total + 2)}
          cartCount={cart?.cartCount}
          activeTab="cart"
          showDesktop={false}
        />
      </div>
    </div>
  );
}
