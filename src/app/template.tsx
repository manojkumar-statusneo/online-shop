"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <motion.div
      key={pathname}
      initial={false}
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
          x: pathname === "/" ? "100%" : "-100%", // Change to start from right side of the screen
        },
        pageAnimate: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        },
        pageExit: {
          opacity: 0,
          x: pathname === "/" ? "-100%" : "100%", // Change to go out to the left side of the screen
          transition: { duration: 0.5, ease: "easeInOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
