import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Navbar from "./nav-bar";
import Footer from "./footer";
import FooterNav from "./footerNav";
import PaymentFooter from "./paymentFooter";

const ParentContainer = ({ children, cartCount }: any) => {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="pt-16">
        <div className="bg-white min-h-screen">{children}</div>
        <FooterNav cartCount={cartCount} />
      </main>
      <footer className="pb-16">
        <Footer />
        <PaymentFooter />
      </footer>
    </>
  );
};
export default ParentContainer;
