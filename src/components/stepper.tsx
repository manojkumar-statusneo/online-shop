import React from "react";
const Stepper = ({ screen }: any) => {
  if(screen==='cart'){
    return (
      <>
       <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-slate-800  dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-500 
          rounded-full  bg-blue-600 shrink-0 dark:border-blue-500`}>
              1
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">CART</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center">
          <span className="flex items-center justify-center w-5 h-5  text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
          </span>
          <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">ADDRESS</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center">
          <span className="flex items-center justify-center w-5 h-5  text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
          </span>
          <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">PAYMENT</span>
      </li>
  </ol>
      </>
    );
  }
  else if(screen==='checkout'){
    return (
      <>
       <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-slate-800  dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-500 
          rounded-full  bg-blue-600 shrink-0`}>
              1
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">CART</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-500 
          rounded-full  bg-blue-600 shrink-0 dark:border-blue-500`}>
              2
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">ADDRESS</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center">
          <span className="flex items-center justify-center w-5 h-5  text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
          </span>
          <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">PAYMENT</span>
      </li>
  </ol>
      </>
    );
   
  }
  else if(screen ==='payment'){
    return (
      <>
       <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-slate-800  dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-500
          rounded-full  bg-blue-500 shrink-0 dark:border-blue-500`}>
              1
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">CART</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-500 
          rounded-full bg-blue-500 shrink-0 dark:border-blue-500`}>
              2
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">ADDRESS</span>
          <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
          </svg>
      </li>
      <li className="flex items-center text-white dark:text-blue-500">
          <span className={`flex items-center text-white justify-center w-5 h-5 font-josefin font-thin text-xs border border-blue-600 
          rounded-full  bg-blue-500 shrink-0 dark:border-blue-500`}>
              3
          </span>
           <span className="hidden sm:inline-flex sm:ms-1 font-sans text-sm">PAYMENT</span>
         
      </li>
  </ol>
      </>
    );
   
  }
  return null
  
};

export default Stepper;
