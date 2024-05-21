import React, { useState } from "react";
import {
  ChevronRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";
import "react-spring-bottom-sheet/dist/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/config";
import { saveUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
var recaptchaVerifier = null as any;
const FooterTab = ({ router, total, onlyMenu, activeTab, cartCount }: any) => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const isLoggedIn = user?.mobile ? true : false;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const onDismiss = () => {
    setShowMenu(false);
  };
  const onVerifyOtp = () => {
    if (verificationResult) {
      verificationResult
        .confirm(verificationCode)
        .then((result: any) => {
          // User signed in successfully.
          console.log("otp verify response ", result?.user?.phoneNumber);
          console.log("otp verify response ", result?.user?.uid);

          login(result?.user?.phoneNumber, result?.user?.uid);
          // ...
        })
        .catch((error) => {
          console.log("error otp verify", error);
        });
    }
  };

  const verifyRecaptcha = () => {
    recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response: any) {
          console.log("response", response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  };
  const handleSendOTP = async () => {
    verifyRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        `+91${phoneNumber}`,
        recaptchaVerifier
      );
      console.log("confirmation", confirmation);
      setVerificationResult(confirmation);
      setShowMenu(false);
      setShowOtpScreen(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const login = (mobile: string, uid: string) => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: mobile,
        uid: uid,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        if (res?.status === 200) {
          res?.data?.length && dispatch(saveUser(res.data[0]));
          router.push("/login");
        }
      })
      .catch((error) => console.log(error));
  };
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
                <h3 className="text-xs font-medium text-blue-800 italic">
                  Payable Amount
                </h3>
                <h2 className="font-medium text-slate-900 italic text-lg">
                  ₹{total?.toLocaleString()}
                </h2>
              </div>
            </div>
            <div
              onClick={(e) => {
                router.push("/checkout");
              }}
              className="cursor-pointer flex flex-1 gap-1 items-center justify-center border border-transparent bg-slate-800 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-900 rounded-md"
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
            className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center  text-gray-900 self-center justify-center">
              <HomeIcon
                // onClick={() => setOpen(true)}
                className="h-6 w-6 font-bold text-gray-500"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-500 pl-1">Home</p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full"
          >
            <div className="flex items-center relative self-center justify-center">
              <ShoppingBagIcon
                // onClick={() => setOpen(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "cart" ? "text-blue-700" : "text-gray-500"
                }`}
                aria-hidden="true"
              />
              <span className="absolute pt-[1px] mr-12 mb-3 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-xl group-hover:text-slate-950">
                {cartCount ?? ""}
              </span>
              <p
                className={`text-sm  pl-1 ${
                  activeTab == "cart" ? "text-blue-700" : "text-gray-500"
                }`}
              >
                Cart
              </p>
            </div>
          </Link>
          {isLoggedIn ? (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-800 bg-slate-100 w-full py-2 items-center rounded-full self-center"
            >
              <div className="flex items-center  text-gray-900 self-center justify-center">
                <UserIcon
                  // onClick={() => setOpen(true)}
                  className={`h-6 w-6 font-bold ${
                    activeTab == "account" ? "text-blue-700" : "text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                <p
                  className={`text-sm ${
                    activeTab == "account" ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  Account
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center  text-gray-900 self-center justify-center">
              <UserIcon
                onClick={() => setShowMenu(true)}
                className={`h-6 w-6 font-bold ${
                  activeTab == "account" ? "text-blue-700" : "text-gray-500"
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-sm ${
                  activeTab == "account" ? "text-blue-700" : "text-gray-500"
                }`}
              >
                Account
              </p>
            </div>
          )}
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
      <BottomSheet
        open={showMenu}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight * 0.8}
        snapPoints={({ maxHeight }) => maxHeight * 0.35}
      >
        <div className="flex items-center flex-col pb-2">
          <p className="text-lg font-medium px-4 text-center">Sign In</p>
          <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
            <div id="recaptcha-container"></div>
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
                type="tel"
                placeholder="Mobile Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </div>
            <p className="text-xs text-gray-700">
              We will send you an SMS with a verification code.
            </p>
          </div>
          <button
            id="recaptcha-container"
            className=" mt-3 py-2 px-4 border rounded-md text-white bg-slate-900"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
        </div>
      </BottomSheet>
      <BottomSheet
        open={showOtpScreen}
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
            {`Enter 6-Digit OTP sent to +91${phoneNumber}`}
          </p>
          <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
            {/* <div className=" gap-1 flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-1">
              {codeInputFields}
            </div> */}
            <OtpInput
              containerStyle={
                "gap-1 flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-1"
              }
              inputStyle={
                "font-normal w-full h-full p-2 items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-slate-700 bg-white focus:bg-gray-50"
              }
              skipDefaultStyles={true}
              value={verificationCode}
              onChange={setVerificationCode}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  // className="font-normal w-32 h-full  items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-slate-700 bg-white focus:bg-gray-50 "
                />
              )}
            />
          </div>
          <button
            onClick={onVerifyOtp}
            className="cursor-pointer mt-4 py-2 px-4 border rounded-md text-white bg-slate-900"
          >
            Verify
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};
export default FooterTab;
