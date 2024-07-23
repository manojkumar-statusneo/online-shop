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
import OrderSummery from "@/components/order-summery";
import Auth from "@/components/auth";

export default function Cart() {
  const dispatch = useDispatch();
  const [triggerLogin, setTriggerLogin] = useState(false);
  const [nextRoute, setNextRoute] = useState('');
  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.user.user);
  console.log("cart", cart);
  const onDismiss = () => {
    setNextRoute("");
    setTriggerLogin(false);
  };
  const closeLoginModal = ()=>{
    setTriggerLogin(false);
  }

  const decreaseQty = (item: any) => {
    dispatch(removeToCart(item));
  };
  const increaseQty = (item: any) => {
    dispatch(addToCart(item));
  };
const onClickCheckout = ()=>{
  setNextRoute('/login')
  setTriggerLogin(true)
}
  return (
    <div className="bg-[#fff] flex-1 flex-col flex-grow pb-36 lg:pb-1">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12 justify-between flex-1 lg:hidden">
        <div className="ml-1 flex h-7 items-center ">
          <button
            type="button"
            className="z-50 px-2 text-slate"
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
        <NavBarDesktop cartCount={cart?.cartCount} total={parseInt(cart?.total + 2)} screen="cart" onClickCheckout={onClickCheckout} />
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
                          <div className="flex justify-between w-[100%] font-syne text-xs text-slate lg:text-lg">
                            <h3>{product?.title}</h3>
                            <button
                              type="button"
                              className="font-medium text-slate"
                            >
                              <TrashIcon
                                className="h-6 w-5 text-slate"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div>

                          <div className="flex flex-row items-center">
                    <h3 className="text-xs lg:text-base">{`₹${product.price}`}</h3>
                    <h3 className="text-xs line-through pl-1 text-gray italic lg:text-base">{`₹${Number(
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
                            className="font-medium text-slate hover:text-indigo-500"
                          >
                            <MinusIcon
                              className="h-4 w-4 text-slate"
                              aria-hidden="true"
                            />
                          </button>
                          <p className="text-slate text-sm">{product.qty}</p>

                          <button
                            onClick={() => increaseQty(product)}
                            type="button"
                            className="font-medium text-slate hover:text-indigo-500"
                          >
                            <PlusIcon
                              className="h-4 w-4 text-slate"
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
            <OrderSummery
            cartTotal ={cart?.total}
            deliveryFees={0}
            buttonTitle='Checkout'
            onClickButton={()=>{

              if(user?.mobile){
                router.push('/checkout')
              }
              else{
                setNextRoute('/checkout')
                setTriggerLogin(true);
              }
            }}
            />
          
          </div>
        ) : (
          <div className="flex h-screen  my-2 flex-col  items-center text-center">
            <p className="font-medium text-2xl text-gray">
              {" "}
              Cart is empty{" "}
            </p>
          </div>
        )}
      </div>
      <PaymentFooter />
      <div className={`${cart?.cartCount == 0 && "hidden"} lg:hidden`}>
        <FooterTab
          router={router}
          total={parseInt(cart?.total + 2)}
          cartCount={cart?.cartCount}
          activeTab="cart"
          onClickCheckout = {onClickCheckout}
        />
        <Auth
         onDismiss={onDismiss}
         triggerLogin={triggerLogin}
         router={router}
         nextRoute={nextRoute}
         closeLoginModal={closeLoginModal}
        />
      </div>
    </div>
  );
}
