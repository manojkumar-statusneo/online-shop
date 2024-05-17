"use client";
import { useState, useCallback } from "react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIcon2 } from "@heroicons/react/24/solid";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "@/lib/slices/cartSlice";
import Stepper from "@/components/stepper";
import { redirect, useRouter } from "next/navigation";
import PaymentFooter from "@/components/paymentFooter";
import Image from "next/image";
import Accordion from "@/components/accordion";
import RadioButtonOption from "@/components/paymentOption";
const option = [
  {
    title: "Phone Pay",
    image: (
      <Image
        alt="abc"
        src="/phonepe.svg"
        height={36}
        width={36}
        className="border-1"
      />
    ),
  },
  {
    title: "Google Pay",
    image: (
      <Image
        alt="abc"
        src="/googlepay.svg"
        height={36}
        width={36}
        className="border-1"
      />
    ),
  },
  {
    title: "Paytm",
    image: (
      <Image
        alt="abc"
        src="/paytm.svg"
        height={36}
        width={36}
        className="border-1 p-1"
      />
    ),
  },
];

export default function Payment() {
  const router = useRouter();
  const dispatch = useDispatch();
  const Razorpay = useRazorpay();
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.user.user);
  const [selectedOption, setSelectedOption] = useState("Phone Pay");

  const saveOrder = (order_id: string) => {
    const shippingInfo = {
      address: "abcd",
      pinCode: 125001,
      city: "Hisar",
      state: "Haryana",
      country: "india",
      phoneNo: 8765433456,
    };
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/order/createorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        order_id: order_id,
        user: user,
        totalPrice: cart?.total,
        products: cart?.cartProducts,
        shippingInfo,
        shippingCharge: 20,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        if (res?.status === 200) {
          dispatch(resetCart());
          router.push("/success");
        }
      })
      .catch((error) => console.log(error));
  };
  const createOrder = async () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    const data = await fetch(`${path}/api/payment/razorpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: cart?.total * 100,
        currency: "INR",
      }),
    })
      .then((t) => t.json())
      .catch((error) => console.log(error));
    return data;
  };

  const handlePayment = useCallback(async () => {
    const order = await createOrder();

    console.log("myorder", order);
    if (order) {
      const options = {
        key: "rzp_test_U1odAZx2aIXLbD",
        amount: cart?.total * 100,
        currency: "INR",
        name: "UrbanYuvati",
        checkout: {
          method: {
            netbanking: 0,
            card: 1,
            upi: 1,
            wallet: 1,
          },
        },
        order_id: order.id,
        handler: async (response: any) => {
          const data = {
            orderCreationId: order?.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const path = process.env.NEXT_PUBLIC_API_PATH;
          const result = await fetch(`${path}/api/payment/verify`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
          });
          console.log("VERIFY API", result);
          if (result?.statusText == "OK") {
            saveOrder(response.razorpay_order_id);
          }
        },
        theme: {
          color: "#0f172a",
        },
        // config: {
        //   display: {
        //     blocks: {
        //       banks: {
        //         name: "Pay via UPI",
        //         instruments: [
        //           {
        //             method: "upi",
        //             apps: ["google_pay"],
        //           },
        //           {
        //             method: "upi",
        //             apps: ["paytm"],
        //           },
        //           {
        //             method: "upi",
        //             apps: ["phonepay"],
        //           },
        //         ],
        //       },
        //       cards: {
        //         name: "Pay via Cards",
        //         instruments: [
        //           {
        //             method: "card",
        //           },
        //         ],
        //       },
        //     },

        //     sequence: ["upi", "block.cards"],
        //     preferences: {
        //       show_default_blocks: true,
        //     },
        //   },
        // },
        //redirect: true,
        // callback_url: `/success`,
      };
      const rzpay = new Razorpay(options as any);
      rzpay.on("payment.failed", function (response: any) {
        console.log("responseeeee rajorpay", response);

        alert(response.error.reason);
      });
      rzpay.open();
    }
  }, [Razorpay]);

  const handleSelectOption = (option: any) => {
    setSelectedOption(option?.title);
  };
  return (
    <div className="bg-slate-50 flex-1 flex-col flex-grow pb-20">
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
          <h1 className="font-normal">Payment</h1>
        </div>
        <div className="flex items-center h-7">
          <h1 className="font-normal text-sm"> STEP 3/3</h1>
        </div>
      </div>
      <div>
        <Accordion title="UPI">
          <RadioButtonOption
            options={option}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
          />
        </Accordion>
      </div>
      <div className="flex mt-2 py-3 px-3  w-full items-center  bg-white justify-between">
        <div className="pr-3">
          <div className="flex gap-1 items-center">
            <CreditCardIcon
              className="h-6 w-6 text-slate-700"
              aria-hidden="true"
            />
            <h2 className=" text-slate-900 font-normal">Online payment</h2>
          </div>

          <p className="text-gray-600 text-xs">
            Use credit/debit card,UPI,wallet to complete the payment
          </p>
        </div>

        <button
          type="button"
          className="font-medium text-slate-800 h-6 w-6 mt-1"
          onClick={() => setSelectedOption("card")}
        >
          {selectedOption === "card" ? (
            <CheckCircleIcon2
              className="h-6 w-6 text-slate-700"
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className="h-6 w-6 text-slate-700"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <>
        <div className="p-4 mt-2 bg-white flex flex-col justify-center">
          <div className="flex item-center mb-2">
            <Image alt="abc" src="/discount.png" width={30} height={30} />
            <h2 className="items-baseline  font-normal pt-1 ">
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

        <div className="mt-2 p-4 flex flex-col divide-y divide-dashed lg:w-1/3 bg-white ">
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
        <PaymentFooter />
      </>

      <footer
        className="bg-slate-50
              text-center
             fixed
             inset-x-0
             bottom-0"
      >
        <div
          className="mt-2 flex justify-between px-2 py-2 border
             border-b-[0.5px] bg-white"
        >
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-baseline flex-col">
              <h3 className="text-xs font-medium text-blue-800 italic">
                Payable Amount{" "}
              </h3>
              <h2 className="font-medium text-slate-900 italic text-lg">
                ₹{parseInt(cart?.total + 2)?.toLocaleString()}
              </h2>
            </div>
          </div>
          <div
            onClick={handlePayment}
            className="cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-900 rounded-md"
          >
            <h1 className="text-md">
              {`Pay ₹${parseInt(cart?.total + 2)?.toLocaleString()}`}{" "}
            </h1>
          </div>
        </div>
      </footer>
    </div>
  );
}
