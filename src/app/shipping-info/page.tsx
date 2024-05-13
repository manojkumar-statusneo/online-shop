"use client";
import { useState, useCallback } from "react";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "@/lib/slices/cartSlice";
import Stepper from "@/components/stepper";
const steps = ["Address", "Shipping Info", "Payment"];

export default function ShippingInfo() {
  const router = useRouter();
  const data = router.query;
  const dispatch = useDispatch();
  const Razorpay = useRazorpay();
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.user.user);
  console.log("cart", cart);
  console.log("user", user);
  console.log("data***", data);
  const [currentStep, setCurrentStep] = useState(2);
  const [complete, setComplete] = useState(false);

  const saveOrder = (order_id: string) => {
    const shippingInfo = {
      address: data.address,
      pinCode: data.pinCode,
      city: data?.city,
      state: data?.state,
      country: "india",
      phoneNo: data?.mobile,
    };
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/order/saveOrder`, {
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
      }),
    })
      .then((t) => t.json())
      .catch((error) => console.log(error));
    return data;
  };

  const handlePayment = useCallback(async () => {
    const order = await createOrder();
    console.log("myorder", order);
    const options = {
      key: "rzp_test_U1odAZx2aIXLbD",
      amount: cart?.total * 100,
      currency: "INR",
      name: "Online Store",
      order_id: order.id,
      handler: async (response: any) => {
        const data = {
          orderCreationId: order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const path = process.env.NEXT_PUBLIC_API_PATH;
        const result = await fetch(`${path}/api/payment/verification`, {
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
        color: "#1E293B",
      },
    };
    const rzpay = new Razorpay(options as any);
    rzpay.on("payment.failed", function (response: any) {
      console.log("responseeeee rajorpay", response);

      alert(response.error.reason);
    });
    rzpay.open();
  }, [Razorpay]);

  return (
    <div>
      <div className="  bg-slate-50 sticky top-0 z-50 overflow-hidden">
        <div className="flex items-start p-2 mb-3 bg-white py-3">
          <div className="ml-1 flex h-7 items-center">
            <button
              type="button"
              className="z-50 px-2 text-gray-400"
              onClick={(e) => {
                router.back();
              }}
            >
              <span className="sr-only">Close panel</span>
              <ArrowLeftIcon
                className="h-6 w-5 text-black"
                aria-hidden="true"
              />
            </button>
          </div>
          <h1 className="font-normal"> Shipping Info</h1>
        </div>
        <Stepper currentStep={currentStep} complete={complete} steps={steps} />
      </div>
      <div className=" my-6 bg-white p-2 flex flex-col divide-y divide-dashed">
        <div>
          <div className="flex  flex-col py-1  items-baseline text-base font-medium text-gray-900">
            <h2 className="font-sans">Deliver Here</h2>
            <h2>{`${data.name},${data.address}, ${data.city},${data.state}`}</h2>
            <h2>{`Mobile/Phone:${data.mobile}`}</h2>
          </div>
        </div>

        <div className="flex  py-2 gap-2 items-baseline  font-base font-medium text-gray-900">
          <h2 className="font-sans"> Grand total</h2>
          <h2>₹{cart?.total}</h2>
        </div>
        <div className="flex  py-2  text-base font-normal text-gray-900">
          <h2 className="text-slate-700 font-sans text-sm">
            {" "}
            Average delivery time{" "}
            <span className="font-semibold"> 6-7 days</span>
          </h2>
        </div>
      </div>

      <footer
        className="bg-slate-50
              text-center
             fixed
             inset-x-0
             bottom-0"
      >
        <div className="mt-2 flex justify-end px-2">
          <div
            onClick={handlePayment}
            className="flex flex-1  justify-center border border-transparent bg-slate-800 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900"
          >
            <h1 className="text-base">Place Order</h1>
            <ChevronRightIcon className="h-6 w-4" aria-hidden="true" />
          </div>
        </div>
      </footer>
    </div>
  );
}
