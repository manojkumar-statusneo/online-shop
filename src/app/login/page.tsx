"use client";
import FooterTab from "@/components/footerTab";
import { logOut, saveUser } from "@/lib/slices/userSlice";
import {} from "cookie";
import {
  ArrowLeftIcon,
  ListBulletIcon,
  ChevronRightIcon,
  ArrowLeftEndOnRectangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const user = useSelector((state: any) => state.user?.user);
  const cart = useSelector((state: any) => state.cart);

  console.log("user", user);
  const router = useRouter();
  const dispach = useDispatch();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345");

  const onPressLogin = async () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    await fetch(`${path}/api/session/clear`)
      .then((t) => t.json())
      .then((res) => {
        if (res.status === 200) {
          onLogout();
        } else {
          showToast("F", res.msg);
        }
      })
      .catch((error) => console.log("sesion clear", error));
  };
  const showToast = (type: any, msg: any) => {
    if (type === "S") {
      toast.success(msg);
    } else if (type === "F") {
      toast.error(msg);
    }
  };
  const onLogout = () => {
    dispach(logOut());
    router.replace("/");
  };
  return (
    <div>
      <div className="flex  items-start p-2  bg-white sticky top-0 z-50 h-16">
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
        <div className="flex flex-row justify-between w-full pr-2">
          <h1 className="font-normal"> Account</h1>
          <h1 className="font-semibold"> {user?.mobile}</h1>
        </div>
      </div>
      <div className="mx-2">
        <Link href={"/my-order"}>
          <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5">
            <div className="flex flex-row ">
              <ListBulletIcon className="h-6 w-5 text-gray-500" />
              <h1 className="font-normal ml-2"> My Order</h1>
            </div>
            <ChevronRightIcon className="h-6 w-6 text-gray-500" />
          </div>
        </Link>
        <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5 cursor-pointer">
          <div className="flex flex-row ">
            <MapPinIcon className="h-6 w-5 text-gray-500" />
            <h1 className="font-normal ml-2"> Addresses</h1>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5 cursor-pointer">
          <div className="flex flex-row" onClick={onPressLogin}>
            <ArrowLeftEndOnRectangleIcon className="h-6 w-5 text-gray-500" />
            <h1 className="font-normal ml-2">Logout</h1>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <FooterTab
        onlyMenu={true}
        activeTab="account"
        cartCount={cart?.cartCount}
      />
    </div>
  );
}
