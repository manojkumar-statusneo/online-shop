import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-slate p-8 border-gray-200 border">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="mb-4">
          <Image
            alt="abc"
            src="/logo_background.svg"
            height={120}
            width={120}
          />
          <div className="flex flex-col gap-[2px]">
            <p className="text-normal font-medium">Contact Detail</p>
            <p className="text-sm font-medium">manojsoni@gmail.com</p>
            <p className="text-sm font-medium">Azad Nagar Hisar,Haryana</p>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-baseline">
          <p className="text-normal font-medium">Shop Now</p>
          <div className=" lg:flex flex-1 gap-1 flex-col">
            <p className="text-sm font-medium underline underline-offset-2 cursor-pointer">CLOTHES</p>
            <p className="text-sm font-medium underline underline-offset-2 cursor-pointer">BEAUTY</p>
            <p className="text-sm font-medium underline underline-offset-2 cursor-pointer">FOOTWEAR</p>
            <p className="text-sm font-medium underline underline-offset-2 cursor-pointer">JEWELLERY</p>
          </div>
        </div>
        <div className="align-baseline">
          <div className="flex s flex-col gap-[2px]">
            <p className="text-normal font-medium">Connect with us</p>
            <div className="flex flex-row gap-1 items-center">
              <EnvelopeIcon className="h-4 w-4 pt-1" aria-hidden="true" />
              <h2 className="font-sans text-xs pt-1">Instagram</h2>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <EnvelopeIcon className="h-4 w-4 pt-1" aria-hidden="true" />
              <h2 className="font-sans text-xs pt-1">Facebook</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full item-center"></div>
        <div className="flex items-center justify-center w-full self-center mt-4 lg:hidden">
          <div className="flex flex-col items-center gap-[2px]">
            <p className="text-normal font-medium">Shop Now</p>
            <div className="flex flex-1 gap-4 lg:hidden">
              <p className="text-xs font-medium underline underline-offset-2">
                CLOTHES
              </p>
              <p className="text-xs font-medium underline underline-offset-2">
                BEAUTY
              </p>
              <p className="text-xs font-medium underline underline-offset-2">
                FOOTWEAR
              </p>
              <p className="text-xs font-medium underline underline-offset-2">
              JEWELLERY
              </p>
            </div>
          </div>
        </div>
        {/* Copyright Information */}
        <div className="flex items-center justify-center w-full self-center mt-4">
          <p className="text-xs font-medium">
            &copy; 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
