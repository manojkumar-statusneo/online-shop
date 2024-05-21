import React, { useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import {
  BriefcaseIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/config";
import { saveUser } from "@/lib/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
var recaptchaVerifier = null as any;

const FooterNav = ({ cartCount, activeTab }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const isLoggedIn = user?.mobile ? true : false;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const itemsRef = useRef([]);
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
        className="bg-white
              text-center
             fixed
             border
             border-t-1
             inset-x-0
             bottom-0 px-4"
      >
        <div className="mt-2 flex justify-between px-2">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900">
              <HomeIcon
                className={`h-6 w-6 font-bold ${
                  activeTab === "Home" ? "text-blue-700" : "text-slate-900"
                }`}
                aria-hidden="true"
              />
              <p
                className={`font-sans text-sm font-semibold ${
                  activeTab === "Home" ? "text-blue-700" : "text-slate-900"
                }`}
              >
                Home
              </p>
            </div>
          </Link>
          <Link
            href="/home"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900">
              <BriefcaseIcon
                className={`h-6 w-6 font-bold ${
                  activeTab === "Shop" ? "text-blue-700" : "text-slate-900"
                }`}
                aria-hidden="true"
              />

              <p
                className={`font-sans text-sm font-semibold ${
                  activeTab === "Shop" ? "text-blue-700" : "text-slate-900"
                }`}
              >
                Shop
              </p>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <div className="flex flex-col  items-center  text-gray-900 relative">
              <ShoppingBagIcon
                className="h-6 w-6 font-bold text-slate-900"
                aria-hidden="true"
              />
              <span className="absolute pt-[1px] ml-6  w-5 h-5 text-xs font-bold text-white bg-slate-900 rounded rounded-xl group-hover:text-slate-950">
                {cartCount}
              </span>
              <p className="font-sans text-sm font-semibold">Cart</p>
            </div>
          </Link>
          {isLoggedIn ? (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              <div className="flex flex-col  items-center  text-gray-900">
                <UserIcon
                  className="h-6 w-6 font-bold text-slate-900"
                  aria-hidden="true"
                />
                <p className="font-sans text-sm font-semibold">Account</p>
              </div>
            </Link>
          ) : (
            <div
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
              onClick={() => setShowMenu(true)}
            >
              <div className="flex flex-col  items-center  text-gray-900">
                <UserIcon
                  className="h-6 w-6 font-bold text-slate-900"
                  aria-hidden="true"
                />
                <p className="font-sans text-sm font-semibold">Account</p>
              </div>
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
export default FooterNav;
