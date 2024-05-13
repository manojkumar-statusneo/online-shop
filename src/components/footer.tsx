import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-900 p-8 border-gray-200 border">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Social Media Handles */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">LOGO</h2>
          <div className="flex s flex-col gap-2">
            <p className="text-normal font-medium">Contact Detail</p>
            <p className="text-xs font-base">Contact us: manojsoni@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="">
            <div className="flex s flex-col gap-1">
              <p className="text-normal font-medium">Shop Now</p>
              <p className="text-xs font-base">Clothes</p>
              <p className="text-xs font-base">Beauty</p>
              <p className="text-xs font-base">Shoes</p>
              <p className="text-xs font-base">Jewelry</p>
            </div>
          </div>
          <div className="align-baseline">
            <div className="flex s flex-col gap-1">
              <p className="text-normal font-medium">Connect with us</p>
              <div className="flex flex-row gap-1 items-center">
                <EnvelopeIcon className="h-4 w-4 pt-1" aria-hidden="true" />
                <h2 className="font-sans text-xs pt-1">Instagram</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="flex items-center justify-center w-full self-center mt-4">
          <p className="text-xs font-base">
            &copy; 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
