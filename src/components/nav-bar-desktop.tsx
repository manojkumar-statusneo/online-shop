"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FooterTab from "./footerTab";
import Stepper from "./stepper";

export default function NavBarDesktop({
  cartCount,
  total,
  screen,
  hideStepper,
  activeTab,
  onClickCheckout
}: any) {
  const router = useRouter();
  return (
    <>
      <div className="flex h-20  lg:px-28 justify-between items-center bg-white px-4 flex-1 border">
        <div className="hidden lg:flex">
          <Link href="/" className="cursor-pointer">
            <Image
              alt="abc"
              src="/logo_background.svg"
              height={160}
              width={160}
            />
          </Link>
        </div>

        {!hideStepper && (
          <div>
            <Stepper screen={screen} />
          </div>
        )}
        <FooterTab
          router={router}
          total={parseInt(total + 2)}
          cartCount={cartCount}
          activeTab={activeTab || "cart"}
          onClickCheckout={onClickCheckout}
        />
      </div>
    </>
  );
}
