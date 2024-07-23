"use client";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddressForm from "@/components/address-form";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
export default function Address() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  const [fullAddress, setFullAddress] = useState({
    name: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    country: "",
    mobile: "",
  });
  console.log("fullAddress", user);
  const fetchDataByPincode = async () => {
    const data = await fetch(
      `https://api.postalpincode.in/pincode/${fullAddress?.pinCode}`
    );
    const res = await data.json();
    const postalDetail = res.length && res[0].PostOffice[0];
    setFullAddress({
      ...fullAddress,
      city: postalDetail?.Block,
      state: postalDetail?.State,
    });
    console.log("response****", res.length && res[0].PostOffice[0]);
  };
  useEffect(() => {
    if (fullAddress?.pinCode.length === 6) {
      fetchDataByPincode();
    }
  }, [fullAddress?.pinCode]);
  const saveAddress = () => {
    setIsLoading(true);
    let payload = {
      address: fullAddress?.address,
      name: fullAddress?.name,
      phoneNo: fullAddress?.mobile,
      city: fullAddress?.city,
      state: fullAddress?.state,
      user: user?._id,
      pinCode: fullAddress?.pinCode,
    };
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/address/addaddress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((res) => {
        setIsLoading(false);
        console.log("RES", res);
        if (res?.status === 200) {
          toast.success(res?.msg);
          router.push("/checkout");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col flex-1 overflow-y-auto pb-10 bg-[#fff]">
      <div className="flex items-start p-2  bg-white sticky top-0 z-50 h-12 justify-between flex-1">
        <div className="ml-1 flex h-7 items-center ">
          <button
            type="button"
            className="z-50 px-2 text-gray"
            onClick={(e) => {
              router.back();
            }}
          >
            <span className="sr-only">Close panel</span>
            <ArrowLeftIcon className="h-6 w-5 text-black" aria-hidden="true" />
          </button>
          <h1 className="font-normal">Create Address</h1>
        </div>
        <div className="flex items-center h-7">
          {/* <h1 className="font-normal text-sm"> STEP 2/3</h1> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:mx-10">
        <div className="flex-col lg:flex lg:col-span-2">
          <div>
            <AddressForm
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
            />
          </div>
        </div>
      </div>

      <footer
        className="bg-white
              text-center
             fixed
             inset-x-0
             bottom-0
             lg:hidden
             p-2
             "
      >
        <div className="mx-3">
          {isLoading ? (
            <div className="mt-3">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              className=" bg-slate px-2 h-11 w-full rounded text-base font-medium text-white shadow-sm "
              onClick={saveAddress}
            >
              Save Address
            </button>
          )}
        </div>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
