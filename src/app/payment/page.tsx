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
import {  useRouter } from "next/navigation";
import PaymentFooter from "@/components/paymentFooter";
import Image from "next/image";
import Accordion from "@/components/accordion";
import RadioButtonOption from "@/components/paymentOption";
import NavBarDesktop from "@/components/nav-bar-desktop";
import OrderSummery from "@/components/order-summery";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "@/components/spinner";
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
  const selectedAddress = useSelector((state: any) => state.order?.
selectedAddress);
  const user = useSelector((state: any) => state.user.user);
  const [selectedOption, setSelectedOption] = useState("Phone Pay");
  const [isLoading, setIsLoading] = useState(false);

  const saveOrder = (order_id: string) => {
    const shippingInfo = {
      address: selectedAddress?.address,
      pinCode: selectedAddress?.pinCode,
      city: selectedAddress?.city,
      state: selectedAddress?.state,
      country: "india",
      phoneNo:selectedAddress?.phoneNo ,
    };
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/order/createorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        order_id: order_id,
        user: user?._id,
        totalPrice: cart?.total,
        products: cart?.cartProducts,
        shippingInfo,
        shippingCharge: 20,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.status === 200) {
          router.push("/success");
          dispatch(resetCart());
        }
        else{
          toast.error("Something went wrong 😑");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong 😑");
        console.log(error)
      });
  };
  const createOrder = async () => {
    try {
      const path = process.env.NEXT_PUBLIC_API_PATH;
    const data = await fetch(`${path}/api/payment/razorpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: cart?.total * 100,
        currency: "INR",
      }),
    })
    const response = data.json();

    return response;
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
    
  };

  const handlePayment = useCallback(async () => {
    try {
      setIsLoading(true)
      const order = await createOrder();
      console.log("myorder", order);
      if (order) {
        const options = {
          key: "rzp_test_U1odAZx2aIXLbD",
          amount: cart?.total * 100,
          currency: "INR",
          name: "UrbanYuvati",
          prefill: {'contact': user?.mobile},
        readonly: { 'contact': false },
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
            console.log("verify result", result);
            if (result?.ok) {
              setIsLoading(false);
              saveOrder(response.razorpay_order_id);
            }
          },
          theme: {
            color: "#0f172a",
          },
        };
        const rzpay = new Razorpay(options as any);
        rzpay.on("payment.failed", function (response: any) {
          console.log("responseeeee rajorpay", response);
          alert(response.error.reason);
        });
        rzpay.open();
      }
      else{
        setIsLoading(false)
        toast.error("Something went wrong 😑");
      }
    } catch (error) {
      toast.error("there is some issue,Please try again 😑");
      setIsLoading(false)
    }
  
  }, [Razorpay]);

  const handleSelectOption = (option: any) => {
    setSelectedOption(option?.title);
  };
  return (
    <div className="bg-[#fff] flex-1 flex-col flex-grow pb-20">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12 justify-between flex-1 lg:hidden">
        <div className="ml-1 flex h-7 items-center ">
          <button
            type="button"
            className="z-50 px-2 text-gray"
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
      <div className={`hidden lg:flex`}>
        <NavBarDesktop cartCount={cart?.cartCount} total={parseInt(cart?.total + 2)} screen="payment" />
      </div>
      <div className="flex flex-col w-full lg:flex lg:flex-1 lg:px-28 my-2">
      <div className="flex flex-col lg:flex-row">
     <div className="lg:flex lg:w-full lg:flex-col border mr-2">
     <Accordion title="UPI">
          <RadioButtonOption
            options={option}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
          />
        </Accordion>
        <div className="flex mt-2 py-3 px-3  w-full items-center  bg-white justify-between">
        <div className=" lg:flex flex-1 lg:flex-col">
          <div className="flex gap-1 items-center">
            <CreditCardIcon
              className="h-6 w-6 text-slate"
              aria-hidden="true"
            />
            <h2 className=" text-slate font-normal">Online payment</h2>
          </div>

          <p className="text-gray text-xs">
            Use credit/debit card,UPI,wallet to complete the payment
          </p>
        </div>
        <button
          type="button"
          className="font-medium text-slate h-6 w-6 mt-1"
          onClick={() => setSelectedOption("card")}
        >
          {selectedOption === "card" ? (
            <CheckCircleIcon2
              className="h-6 w-6 text-slate"
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className="h-6 w-6 text-slate"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
     </div>
      
     <OrderSummery
            cartTotal ={cart?.total}
            deliveryFees={0}
            buttonTitle='Pay Now'
            onClickButton={()=>{
              handlePayment()
            }}
            />
</div>

</div>
<PaymentFooter />
      <footer
        className="bg-[#fff]
              text-center
             fixed
             inset-x-0
             bottom-0
             lg:hidden
             "
             
      >
        <div
          className="mt-2 flex justify-between px-2 py-2 border
             border-b-[0.5px] bg-white"
        >
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-baseline flex-col">
              <h3 className="text-xs font-medium text-primary italic">
                Payable Amount{" "}
              </h3>
              <h2 className="font-medium text-slate italic text-lg">
                ₹{parseInt(cart?.total + 2)?.toLocaleString()}
              </h2>
            </div>
          </div>
          {isLoading? <Spinner color="text-slate" extraClasses="self-center" />: <div
            onClick={handlePayment}
            className="cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-slate rounded-md"
          >
            <h1 className="text-md">
              {`Pay ₹${parseInt(cart?.total + 2)?.toLocaleString()}`}{" "}
            </h1>
          </div>}
        </div>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
