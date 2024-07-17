"use client";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function MyAddress() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  const [addressList, setAddressList] = useState([]);

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
    getAddressList();
  }, []);

  return (
    <div>
      <div className=" bg-[#fff] sticky top-0 z-50 overflow-hidden">
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
          <h1 className="font-normal"> My Orders</h1>
        </div>
      </div>
      <div className="m-2">
        <div className=" px-2 lg:flex flex-1  ">
          <div className="flow-root lg:flex flex-1 ">
            <ul role="list" className="my-2 lg:flex-1">
              {addressList.map((item: any, index: number) => (
                <li
                  key={item._id}
                  className="flex py-2 px-2 rounded-md mb-1 bg-white border"
                >
                  <div className="ml-2 flex flex-1 flex-col justify-evenly">
                    <div className="flex font-serif text-base font-medium text-slate-900">
                      <h3>{item?.name}</h3>
                    </div>

                    <div>
                      <p className="text-sm text-gray-700">{`${item.address}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{`${item.city}, ${item.state}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{`+91${item?.phoneNo}`}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link href={`/address`}>
          <div className="flex mt-2 py-3  w-full items-center text-center bg-white justify-center">
            <PlusIcon className="h-6 w-6 text-black" aria-hidden="true" />
            <p className=" text-slate-900 font-medium text-lg">
              Add new address
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
