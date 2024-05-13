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
        console.log("CATAATTTTRES", res);
        setCatList(res.data);
      })
      .catch((error) => console.log("ERRRRRRPP", error));
  };

  useEffect(() => {
    getCatList();
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-4 pt-0 ">
        <div className="mx-auto max-w-2xl sm:py-2 lg:max-w-none lg:py-8">
          <h2 className="text-2xl py-2 text-center text-gray-900 lg:text-3xl">
            Collections
          </h2>

          <div className="items-center justify-center mt-2 grid grid-cols-2 gap-4 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {catList?.map((callout: any) => (
              <Link
                key={callout.name}
                href={`/catwise-products/${callout._id}`}
              >
                <div>
                  <div className="relative h-40  overflow-hidden  bg-white  sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-2 group-hover:opacity-75">
                    <Image
                      loader={externaImageLoader}
                      fill
                      src={callout?.image}
                      alt={callout.name}
                      className="h-full w-full object-cover object-center lg:h-52"
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-gray-500 text-center lg:text-xl">
                    {/* <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a> */}
                  </h3>
                  <p className="text-base font-medium text-gray-900 text-center">
                    {callout.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
