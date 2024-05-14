"use client";
import { useState } from "react";
import {
  ArrowLeftIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import "react-spring-bottom-sheet/dist/style.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FooterNav from "@/components/footerNav";
import { addToCart, removeToCart } from "@/lib/slices/cartSlice";
import FooterTab from "@/components/footerTab";
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
    <div className="bg-slate-50 flex-1 flex-col h-screen">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12">
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
        </div>
        <h1 className="font-normal"> Shopping cart</h1>
      </div>
      <div className=" flex flex-col w-full lg:flex lg:flex-1 lg:px-10 mt-6 ">
        {cart?.cartCount > 0 ? (
          <div className="flex flex-col bg-white  lg:flex-row flex-grow">
            <div className="mt-8 px-3 lg:flex flex-1">
              <div className="flow-root lg:flex flex-1 ">
                <ul role="list" className="my-2 lg:flex-1">
                  {cart?.cartProducts.map((product: any) => (
                    <li
                      key={product._id}
                      className="flex py-2 px-2 border my-2"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.images[0]}
                          alt={product.images[0]}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-evenly">
                        <div>
                          <div className="flex justify-between  font-serif text-base font-medium text-gray-900">
                            <h3>{product.title}</h3>
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
                          <p className="">{`₹${product.price}`}</p>
                        </div>
                        <div className="flex w-20 text-center font-serif text-base justify-evenly border-gray-400 border-[1px] p-1">
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
            <div className="my-6 p-2 flex flex-col divide-y divide-dashed lg:w-1/3 ">
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
                  Average delivery time{" "}
                  <span className="font-semibold"> 6-7 days</span>
                </h2>
              </div>
              <div className="flex  mx-3 bg-green-100 rounded-sm justify-center p-1 text-base font-normal text-gray-900 ">
                <h2 className="text-green-500">
                  {" "}
                  ₹26 saved so far on this order{" "}
                </h2>
              </div>
              <div
                onClick={(e) => {
                  router.push("/checkout");
                }}
                className="hidden cursor-pointer mx-3 lg:flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 my-2"
              >
                <h1 className="text-base">Checkout</h1>
                <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen  mt-10 flex-col  items-center text-center">
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
          activeTab="cart"
        />
      </div>
    </div>
  );
}
