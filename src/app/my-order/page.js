"use client"
import { useState, useCallback, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSelector } from "react-redux";
const steps = ["Address", "Shipping Info", "Payment"];
const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
];
export default function Myorder() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [orderList, setOrderList] = useState([]);

  const getOrderList = () => {
    const path = process.env.NEXT_PUBLIC_API_PATH
    fetch(`${path}/api/order/getUserOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId: user._id,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        setOrderList(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderList();
  }, []);

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
          <h1 className="font-normal"> My Orders</h1>
        </div>
      </div>
      <div className="m-2">
        <ul role="list">
          {orderList.map((item) => (
            <li
              key={item.order_id}
              className="flex px-2 justify-between gap-x-6 py-5 border my-2"
            >
              <div className="flex gap-x-4">
                <img
                  className="h-full w-24 flex-none  bg-gray-50"
                  src={item.products[0].images[0]}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className=" text-sm leading-5 text-gray-500">
                    {item.order_id}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                    Total:₹{item.totalPrice}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                    Status:₹{item.orderStatus}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                    Date:₹{moment(item.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
