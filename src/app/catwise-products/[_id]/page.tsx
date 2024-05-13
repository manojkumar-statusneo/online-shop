"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getCatWiseProducts } from "@/services/productServices";
import ParentContainer from "@/components/parentContainer";

const externaImageLoader = ({ src }: any) => `${src}`;

const CatWiseProducts = async ({ params }: any) => {
  const catInfo = await getCatWiseProducts(params?._id);
  const cart = useSelector((state: any) => state.cart);
  console.log("ID****", catInfo);

  return (
    <ParentContainer cartCount={cart?.cartCount || 0}>
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap -mx-4">
          {catInfo.map((callout: any) => (
            <div
              key={callout._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
            >
              {/* <Link href={"/product-detail"}> */}
              <Link href={`/product-detail/${callout._id}`}>
                <div className="min-w-full overflow-hidden  sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-1">
                  <Image
                    loader={externaImageLoader}
                    fill
                    src={callout?.images && callout?.images[0]}
                    alt={callout?.images && callout?.images[0]}
                  />
                </div>
              </Link>
              <div className=" pb-1 flex flex-col text-center items-center">
                <h3 className="mt-2 text-md text-gray-500">{callout.title}</h3>
                <h3 className=" text-md text-slate-950">{`₹${callout.price}`}</h3>
                <button
                  className="text-sm  justify-center items-center py-1 flex self-center my-1 w-32 border border-slate-400 bg-white"
                  // onClick={() => {
                  //   props.onPressCart(callout);
                  // }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParentContainer>
  );
};
export default CatWiseProducts;
