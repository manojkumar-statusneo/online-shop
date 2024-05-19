import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const externaImageLoader = ({ src }: any) => `${src}`;

export default function Category() {
  const [catList, setCatList] = useState([]);

  const getCatList = () => {
    const path = process.env.NEXT_PUBLIC_API_PATH;
    fetch(`${path}/api/static/category`)
      .then((r) => r.json())
      .then((res) => {
        setCatList(res.data);
      })
      .catch((error) => console.log("ERRRRRRPP", error));
  };

  useEffect(() => {
    getCatList();
  }, []);

  return (
    <div>
      <div className="sm:px-6 lg:px-20 pt-0">
        <div className="mx-auto max-w-2xl sm:py-2 lg:max-w-none lg:py-8">
          <h2 className="text-2xl py-2 text-center text-gray-900 lg:text-3xl">
            Shop By Category
          </h2>

          <div className="no-scrollbar flex overflow-x-auto space-x-4 py-4 mx-2 lg:flex gap-2 justify-between">
            {catList?.map((callout: any, index: number) => (
              <Link
                key={callout.name}
                href={{
                  pathname: `/catwise-products/${callout._id}`,
                  query: { search: callout?.name }, // the data
                }}
              >
                <div
                  key={index}
                  className="flex flex-col items-center sm:justify-center w-32 rounded overflow-hidden shadow-lg lg:w-60  lg:flex lg:flex-col lg:items-center lg:h-64"
                >
                  <img
                    className="w-full h-28 lg:flex lg:flex-1 lg:h-48"
                    src={callout.image}
                    alt={callout.name}
                  />

                  <p className="font-sm text-xl py-2">{callout.name}</p>
                </div>
                {/* <div>
                  <div className="relative h-40  overflow-hidden  bg-gray-400  sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-2 group-hover:opacity-75">
                    <Image
                      loader={externaImageLoader}
                      fill
                      src={callout?.image}
                      alt={callout.name}
                      className="h-full w-full object-cover object-center lg:h-52"
                    />
                    <p className="text-base font-medium text-gray-900 text-center">
                      {callout.name}
                    </p>
                  </div>
                  <h3 className="mt-2 text-sm text-gray-500 text-center lg:text-xl"></h3>
                </div> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
