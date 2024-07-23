"use client";
import FooterTab from "@/components/footerTab";
import { logOut } from "@/lib/slices/userSlice";
import {} from "cookie";
import {
  ArrowLeftIcon,
  ListBulletIcon,
  ChevronRightIcon,
  ArrowLeftEndOnRectangleIcon,
  MapPinIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarDesktop from "@/components/nav-bar-desktop";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Login() {
  let isMobile = null;
  const user = useSelector((state: any) => state.user?.user);
  const cart = useSelector((state: any) => state.cart);
  const router = useRouter();
  const dispach = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const getOrderList = () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/order/getorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        setOrderList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getAddressList = () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/address/getaddress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        setAddressList(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
  isMobile= typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches;
    getOrderList();
    getAddressList();
  }, []);

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
    toast.success("Logged out successfully");
    dispach(logOut());
    router.replace("/");
  };
  return (
    <div>
      <div className="flex  items-start p-2  bg-white sticky top-0 z-50 h-16 lg:hidden">
        <div className="ml-1 flex h-7 items-center">
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
        </div>
        <div className="flex flex-row justify-between w-full pr-2">
          <h1 className="font-normal"> Account</h1>
          <h1 className="font-semibold"> {user?.mobile}</h1>
        </div>
      </div>
      <div className={`hidden lg:flex`}>
        <NavBarDesktop
          cartCount={cart?.cartCount}
          total={parseInt(cart?.total + 2)}
          screen="cart"
          hideStepper={true}
          activeTab="account"
        />
      </div>
      <div className="hidden lg:flex lg:px-32 pt-10 lg:flex-col">
        <div className="flex flex-row justify-between w-full pr-2">
          <h1 className="font-normal mb-5 text-lg">
            {activeTab === 1 ? "Orders" : "Addresses"}
          </h1>
          <h1 className="font-syne text-lg"> {user?.mobile}</h1>
        </div>

        <div className="inline-flex flex-1 w-full">
          <ul className="flex flex-col w-1/3  border-r-[1px] ">
            <li>
              <div
                onClick={() => setActiveTab(1)}
                className={`cursor-pointer flex flex-row p-4 ${
                  activeTab === 1
                    ? "bg-blue-50 border-r-4 border-blue-600"
                    : ""
                }`}
              >
                <ListBulletIcon className="h-6 w-5 text-gray" />
                <h1 className="font-normal ml-2"> My Order</h1>
              </div>
            </li>
            <li>
              <div
                onClick={() => setActiveTab(2)}
                className={`cursor-pointer flex flex-row p-4 ${
                  activeTab === 2
                    ? "bg-blue-50 border-r-4 border-blue-600"
                    : ""
                }`}
              >
                <ListBulletIcon className="h-6 w-5 text-gray" />
                <h1 className="font-normal ml-2"> Addresses</h1>
              </div>
            </li>
            <li className="flex">
              <div
                onClick={onPressLogin}
                className="cursor-pointer flex flex-row p-4"
              >
                <ArrowLeftEndOnRectangleIcon className="h-6 w-5 text-gray" />
                <h1 className="font-normal ml-2 text-slate">Logout</h1>
              </div>
            </li>
          </ul>
          <div className="my-2 w-full">
            {activeTab === 1 && (
              <div className=" opacity-100 transition-opacity duration-150 ease-linear">
                <div className="px-6">
                  <h1 className="font-normal"> Showing all orders</h1>
                  <ul role="list">
                    {orderList?.length > 0 &&
                      orderList.map((item: any) => (
                        <li
                          key={item?.order_id}
                          className="flex px-2 justify-between gap-x-6 py-5 border my-2"
                        >
                          <div className="flex gap-x-4">
                            <img
                              className="h-24 w-24 flex-none  bg-gray-50"
                              src={item?.products[0]?.images[0]}
                              alt=""
                            />
                            <div className="min-w-0 flex-auto">
                              <p className=" text-sm leading-5 text-gray">
                                {item?.title}
                              </p>
                              <p className="mt-1 truncate text-sm leading-5 text-gray">
                                Total:₹{item?.totalPrice}
                              </p>
                              <p className="mt-1 truncate text-sm leading-5 text-gray">
                                Status:₹{item?.orderStatus}
                              </p>
                              <p className="mt-1 truncate text-sm leading-5 text-gray">
                                Date:₹
                                {moment(item?.createdAt).format("DD-MM-YYYY")}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block">
                <div className="px-6">
                  <h1 className="font-normal pb-3"> Showing all addresses</h1>
                  <ul role="list" className="lg:flex-1">
                    {addressList.map((item: any, index: number) => (
                      <li
                        key={item._id}
                        className="flex py-2 px-2 rounded-md mb-1 bg-white border"
                      >
                        <div className="ml-2 flex flex-1 flex-col justify-evenly">
                          <div className="flex font-serif text-base font-medium text-slate">
                            <h3>{item?.name}</h3>
                          </div>

                          <div>
                            <p className="text-sm text-gray">{`${item.address}`}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray">{`${item.city}, ${item.state}`}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray">{`+91${item?.phoneNo}`}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                     <Link href={`/address`}>
          <div className="flex mt-2 py-3  w-full items-center text-center bg-white justify-center">
            <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
            <p className=" text-slate font-medium text-lg">
              Add new address
            </p>
          </div>
        </Link>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-2 lg:hidden">
        <Link href={"/my-order"}>
          <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5">
            <div className="flex flex-row ">
              <ListBulletIcon className="h-6 w-5 text-gray" />
              <h1 className="font-normal ml-2"> My Order</h1>
            </div>
            <ChevronRightIcon className="h-6 w-6 text-gray" />
          </div>
        </Link>
        <Link href={"/myaddress"}>
          <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5 cursor-pointer">
            <div className="flex flex-row ">
              <MapPinIcon className="h-6 w-5 text-gray" />
              <h1 className="font-normal ml-2"> Addresses</h1>
            </div>
            <ChevronRightIcon className="h-6 w-6 text-gray" />
          </div>
        </Link>

        <div className="flex flex-row justify-between w-full  border-b-[1px] border-gray-100 py-2.5 cursor-pointer">
          <div className="flex flex-row" onClick={onPressLogin}>
            <ArrowLeftEndOnRectangleIcon className="h-6 w-5 text-gray" />
            <h1 className="font-normal ml-2">Logout</h1>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray" />
        </div>
      </div>
      {isMobile &&<FooterTab
        onlyMenu={true}
        activeTab="account"
        cartCount={cart?.cartCount}
      />}
    </div>
  );
}
