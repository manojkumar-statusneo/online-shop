import React from "react";

export default function AddressForm({ fullAddress, setFullAddress }: any) {
  return (
    <>
      <div className="mx-3 my-3 lg:items-start">
        <form className=" flex  flex-col w-full max-w-lg lg:items-center ">
          <div className="w-full md:w-1/2 px-3  md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Enter Name"
              onChange={(e) =>
                setFullAddress({ ...fullAddress, name: e.target.value })
              }
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 lg:w-full lg:mb-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-zip"
            >
              Pincode
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="Enter Pincode"
              onChange={(e) =>
                setFullAddress({ ...fullAddress, pinCode: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-password"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Enter H.No/Area/Block/Town/Colony"
              onChange={(e) =>
                setFullAddress({ ...fullAddress, address: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-password"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              value={fullAddress.city}
              placeholder="Enter City"
              onChange={(e) =>
                setFullAddress({ ...fullAddress, city: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="text"
              value={fullAddress.state}
              placeholder="Enter State"
              onChange={(e) =>
                setFullAddress({ ...fullAddress, state: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 lg:w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-1"
              htmlFor="grid-mobile"
            >
              Mobile/Phone No.
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-mobile"
              type="text"
              value={fullAddress.mobile}
              onChange={(e) =>
                setFullAddress({ ...fullAddress, mobile: e.target.value })
              }
              placeholder="Enter Mobile/Phone No."
            />
          </div>
        </form>
      </div>
    </>
  );
}
