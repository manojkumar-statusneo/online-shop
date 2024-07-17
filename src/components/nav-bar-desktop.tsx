"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/slices/userSlice";
import Image from "next/image";
import FooterTab from "./footerTab";
import Stepper from "./stepper";

export default function NavBarDesktop({ cartCount, total,screen,hideStepper,activeTab }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  return (
    <>
      <div className="flex h-20  lg:px-28 justify-between items-center bg-white px-4 flex-1 border">
        <div className="hidden lg:flex">
          <Image
            alt="abc"
            src="/logo_background.svg"
            height={160}
            width={160}
          />
        </div>
        
       {!hideStepper &&<div>
        <Stepper
       screen={screen}
        />
        </div>}
         
            <FooterTab
              router={router}
              total={parseInt(total + 2)}
              cartCount={cartCount}
              activeTab={activeTab||"cart"}
              showDesktop={true}
            />
          
        
      </div>
    </>
  );
}
