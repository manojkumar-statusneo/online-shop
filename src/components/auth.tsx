import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BottomSheet } from "react-spring-bottom-sheet";
import Modal from "react-minimal-modal";
import "react-spring-bottom-sheet/dist/style.css";
import "react-spring-bottom-sheet/dist/style.css";
import "react-spring-bottom-sheet/dist/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/config";
import { saveUser } from "@/lib/slices/userSlice";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import Spinner from "./spinner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
var recaptchaVerifier = null as any;
const Auth = ({
  router,
  triggerLogin,
  onDismiss,
  nextRoute,
  closeLoginModal
}: any) => {
  const dispatch = useDispatch();
  console.log("nextRoute",nextRoute)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
 


  const onDismissOTP = () => {
    setShowOtpScreen(false);
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
        .catch((error:any) => {
          setIsLoading(false);
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
    setIsLoading(true)
    verifyRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        `+91${phoneNumber}`,
        recaptchaVerifier
      );
      console.log("confirmation", confirmation);
      setVerificationResult(confirmation);
      setIsLoading(false)
      closeLoginModal();
      setShowOtpScreen(true);
    } catch (error) {
      setIsLoading(false)
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
          onDismissOTP();
          router.push(`${nextRoute}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error)});
  };

  const isBreakpoint = useMediaQuery(768)
  if (!isBreakpoint) {
    return (
      <div>
        <Modal open={triggerLogin} onOpenChange={() => onDismiss()}>
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
                />
              </div>
              <p className="text-xs text-gray">
                We will send you an SMS with a verification code.
              </p>
            </div>
           {isLoading? <Spinner color="text-slate" extraClasses="self-center" />: <button
              id="recaptcha-container"
              className=" mt-3 py-2 px-4 border rounded-md text-white bg-slate"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>}
          </div>
        </Modal>

        <Modal open={showOtpScreen} onOpenChange={() => onDismissOTP()}>
          <div className="flex items-center flex-col pb-2">
            <p className="text-lg font-medium px-4 text-center">Sign In</p>
            <p className="text-xs text-gray my-3">
              {`Enter 6-Digit OTP sent to +91${phoneNumber}`}
            </p>
            <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
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
           {
           isLoading? <Spinner color="text-slate" extraClasses="self-center" />:
           <button
              onClick={onVerifyOtp}
              className="cursor-pointer mt-4 py-2 px-4 border rounded-md text-white bg-slate"
            >
              Verify
            </button>}
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div> 
      <BottomSheet
        open={triggerLogin}
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
              />
            </div>
            <p className="text-xs text-gray">
              We will send you an SMS with a verification code.
            </p>
          </div>
          {
           isLoading? <Spinner color="text-slate" extraClasses="self-center" />: <button
            id="recaptcha-container"
            className=" mt-3 py-2 px-4 border rounded-md text-white bg-slate"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>}
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
          {
           isLoading? <Spinner color="text-slate" extraClasses="self-center" />: <button
            onClick={onVerifyOtp}
            className="cursor-pointer mt-4 py-2 px-4 border rounded-md text-white bg-slate"
          >
            Verify
          </button>}
        </div>
      </BottomSheet>
    </div>
  );
};
export default Auth;
