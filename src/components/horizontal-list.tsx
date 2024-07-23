import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HorizontalList = (props: any) => {
  const router = useRouter();
  // useEffect(() => {

  //   router.beforePopState(({ as }) => {
  //     if (as !== router.asPath) {
  //       router.replace("/");
  //       // Will run when leaving the current page; on back/forward actions
  //       // Add your logic here, like toggling the modal state
  //     }
  //     return true;
  //   });

  //   return () => {
  //     router.beforePopState(() => true);
  //   };
  // }, [router]);
  return (
    <div className="px-4 relative sm:px-6 lg:mx-20 pb-4">
      <div className="max-w-2xl sm:py-2 lg:max-w-none lg:py-8">
        <h2 className="text-2xl py-2 text-center text-slate lg:text-3xl">
          {props?.title}
        </h2>
      </div>
      <div className="my-4 lg:my-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 no-scrollbar">
          {props?.products?.map((callout: any) => (
            <div
              key={callout?._id}
              className="max-w-xs rounded overflow-hidden shadow-lg no-scrollbar lg:h-80 flex flex-col"
            >
              <Link href={`/product-detail/${callout._id}`}>
                <img
                  className="w-full h-48 lg:h-56"
                  src={callout?.images && callout?.images[0]}
                  alt={callout?.images && callout?.images[0]}
                />
              </Link>
              <div className="pb-1 flex flex-col text-center items-center overflow-hidden px-1">
                <h2 className="mt-2 text-sm truncate overflow-hidden mx-2 w-full font-medium">
                  {callout.title}
                </h2>
                <div className="flex flex-row items-center">
                  <h3 className="text-sm font-medium">{`₹${callout.price}`}</h3>
                  <h3 className=" text-xs line-through pl-1 text-gray italic">{`₹${Number(
                    Number(callout.price) + 100
                  )}`}</h3>
                  <h3 className=" text-xs pl-1  text-green-800">
                    {"(33% off)"}
                  </h3>
                </div>

                <button
                  className="text-xs justify-center items-center py-2 flex self-center my-1 w-full border rounded-md border-slate-900 bg-white"
                  onClick={() => {
                    props?.onPressCart(callout);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HorizontalList;
