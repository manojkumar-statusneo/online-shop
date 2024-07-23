"use client";
import { setCookiesState } from "@/lib/slices/cartSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { logOut, saveUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
const path = process.env.NEXT_PUBLIC_API_PATH;
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const getSession = async () => {
   
    try {
      const res = await fetch(`${path}/api/session`);
      const response = await res.json();
      if (response?.data && Object.keys(response?.data)?.length > 0) {
        storeRef?.current?.dispatch(saveUser(response?.data));
      } else {
        storeRef?.current?.dispatch(logOut());
       
      }
    } catch (error) {
      console.log("session eroor", error);
    }
  };
  const getCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      storeRef?.current?.dispatch(setCookiesState(cartData));
    }
  };
  useEffect(() => {
    getSession();
    getCart();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
