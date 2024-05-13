"use client";
import FooterTab from "@/components/footerTab";
import { saveUser } from "@/lib/slices/userSlice";

import {
  ArrowLeftIcon,
  ListBulletIcon,
  ChevronRightIcon,
  ArrowLeftEndOnRectangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const dispach = useDispatch();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345");

  const onPressLogin = async () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    await fetch(`${path}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((t) => t.json())
      .then((res) => {
        if (res.status === "S") {
          dispach(saveUser(res?.data));
          showToast("S", '"Login SuccessFully"');
          router.replace("/");
        } else {
          showToast("F", res.msg);
        }
      })
      .catch((error) => console.log("errorrrr", error));
  };
  const showToast = (type, msg) => {
    if (type === "S") {
      toast.success(msg);
    } else if (type === "F") {
      toast.error(msg);
    }
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
          <h1 className="font-semibold"> +91852991516</h1>
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
        <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5">
          <div className="flex flex-row ">
            <MapPinIcon className="h-6 w-5 text-gray-500" />
            <h1 className="font-normal ml-2"> Addresses</h1>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5">
          <div className="flex flex-row ">
            <ArrowLeftEndOnRectangleIcon className="h-6 w-5 text-gray-500" />
            <h1 className="font-normal ml-2">Logout</h1>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <FooterTab onlyMenu={true} activeTab="account" />
    </div>
  );
}
