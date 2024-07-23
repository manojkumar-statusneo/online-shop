"use client"
import Link from "next/link";
import lottie from 'lottie-web';
import { useEffect, useRef } from "react";
export default function Success() {
  const animationContainer = useRef(null);

  useEffect(() => {
   const animation= lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animation.json'
    });
    return () => animation.destroy();
  }, []);
  return (
    <div className="flex h-screen  flex-col justify-center items-center text-center">
      <div ref={animationContainer} className="h-52 w-52"/>
      <p className="font-medium text-2xl mt-2"> Order place successfully</p>
      <p className="font-normal text-sm text-gray">
        Click below button to go back to home
      </p>
      <Link href={"/"}>
        <button className="p-2 px-6 bg-slate rounded-[4px] mt-4 cursor-pointer">
          <p className="text-white">Home</p>
        </button>
      </Link>
    </div>
  );
}
