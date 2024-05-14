"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#080c12"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
