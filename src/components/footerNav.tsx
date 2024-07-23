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
import Image from "next/image";
var recaptchaVerifier = null as any;

const FooterNav = ({ cartCount, activeTab }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const isLoggedIn = user?.mobile ? true : false;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const onDismiss = () => {
    setShowMenu(false);
  };
  const onVerifyOtp = () => {
    setIsLoading(true);
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
    setIsLoading(true);
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
      setIsLoading(false);
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
        setIsLoading(false);
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
            className="text-sm font-medium text-gray hover:text-gray"
          >
            <div className="flex flex-col  items-center  text-gray">
              <HomeIcon
                className={`h-6 w-6 font-bold ${
                  activeTab === "Home" ? "text-primary" : "text-slate"
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-sm font-semibold ${
                  activeTab === "Home" ? "text-primary" : "text-slate"
                }`}
              >
                Home
              </p>
            </div>
          </Link>
          <Link
            href="/home"
            className="text-sm font-medium text-gray hover:text-gray"
          >
            <div className="flex flex-col  items-center  text-slate">
              <BriefcaseIcon
                className={`h-6 w-6 font-bold ${
                  activeTab === "Shop" ? "text-primary" : "text-slate"
                }`}
                aria-hidden="true"
              />

              <p
                className={`text-sm font-semibold ${
                  activeTab === "Shop" ? "text-primary" : "text-slate"
                }`}
              >
                Shop
              </p>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-slate hover:text-gray"
          >
            <div className="flex flex-col  items-center  text-slate relative">
              <ShoppingBagIcon
                className="h-6 w-6 font-bold text-slate"
                aria-hidden="true"
              />
              {cartCount>0?<span className="absolute pt-[1px] ml-6  w-5 h-5 text-xs font-bold text-white bg-slate rounded rounded-xl group-hover:text-slate-950">
                {cartCount}
              </span>:null}
              <p className="text-sm font-semibold">Cart</p>
            </div>
          </Link>
          {isLoggedIn ? (
            <Link
              href="/login"
              className="text-sm font-medium"
            >
              <div className="flex flex-col items-center">
                <UserIcon
                  className="h-6 w-6 font-bold text-slate"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">Account</p>
              </div>
            </Link>
          ) : (
            <div
              className="text-sm font-medium text-slate hover:text-slate"
              onClick={() => setShowMenu(true)}
            >
              <div className="flex flex-col  items-center  text-slate">
                <UserIcon
                  className="h-6 w-6 font-bold text-slate"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">Account</p>
              </div>
            </div>
          )}

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
              className="block uppercase tracking-wide text-slate text-xs font-bold mb-2 pl-1"
              htmlFor="grid-first-name"
            >
              Mobile Number
            </label>
            <div className="flex flex-row  w-full bg-white text-slate border rounded py-3 px-4 mb-2">
              <p className=" text-slate mr-2">+91</p>
              <input
                className="appearance-none block w-full bg-white text-slate leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="tel"
                placeholder="Mobile Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
            <p className="text-xs text-gray">
              We will send you an SMS with a verification code.
            </p>
          </div>
          {isLoading ? (
            <div className="mt-3">
             <Image alt="abc" src="/loader.svg" />
            </div>
          ) : (
            <button
              id="recaptcha-container"
              className=" mt-3 py-2 px-4 border rounded-md text-white bg-slate"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          )}
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
              className="h-6 w-6 font-bold text-gray"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs text-gray my-3">
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
                "font-normal w-full h-full p-2 items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-slate bg-white focus:bg-gray-50"
              }
              skipDefaultStyles={true}
              value={verificationCode}
              onChange={setVerificationCode}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  // className="font-normal w-32 h-full  items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-slate bg-white focus:bg-gray-50 "
                />
              )}
            />
          </div>
          {isLoading ? (
            <div className="mt-3">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              onClick={onVerifyOtp}
              className="cursor-pointer mt-4 py-2 px-4 border rounded-md text-white bg-slate"
            >
              Verify
            </button>
          )}
        </div>
      </BottomSheet>
    </div>
  );
};
export default FooterNav;
