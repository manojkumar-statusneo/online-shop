import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Navbar from "./nav-bar";
import Footer from "./footer";
import FooterNav from "./footerNav";
import PaymentFooter from "./paymentFooter";
import { motion } from "framer-motion";
const ParentContainer = ({ children, cartCount, activeTab, hideNav }: any) => {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="pt-14">
        <div className="bg-white min-h-screen">{children ?? ""}</div>
        {!hideNav && <FooterNav cartCount={cartCount} activeTab={activeTab} />}
      </main>
      <footer className="pb-16">
        <Footer />
        <PaymentFooter />
      </footer>
    </>
  );
};
export default ParentContainer;
