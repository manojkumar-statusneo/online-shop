"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCatWiseProducts } from "@/services/productServices";
import ParentContainer from "@/components/parentContainer";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/slices/cartSlice";
import { toast } from "react-toastify";
import DetailHeader from "@/components/detailHeader";
import { useSearchParams } from "next/navigation";

const CatWiseProducts = ({ params }: any) => {
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const [productList, setProductList] = useState<any>([]);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const onPressCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };
  const fetchDetails = async () => {
    const catInfo = await getCatWiseProducts(params?._id);
    console.log("catInfo", catInfo);
    setProductList(catInfo?.data);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <DetailHeader
        cartCount={cart?.cartCount || 0}
        title={searchParams.get("search")}
      />

      <div className="container px-2 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList.map((callout: any, index: number) => (
            <div
              key={index}
              className="max-w-xs rounded overflow-hidden shadow-lg"
            >
              <Link href={`/product-detail/${callout._id}`}>
                <img
                  className="w-full h-48"
                  src={callout?.images && callout?.images[0]}
                  alt={callout?.images && callout?.images[0]}
                />
              </Link>
              <div className="pb-1 flex flex-col text-center items-center overflow-hidden">
                <h2 className="mt-2 text-sm truncate overflow-hidden mx-2 w-full font-medium">
                  {callout.title}
                </h2>
                <div className="flex flex-row items-center">
                  <h3 className="text-sm font-medium">{`₹${callout.price}`}</h3>
                  <h3 className=" text-xs line-through pl-1 text-gray-800 italic">{`₹${Number(
                    Number(callout.price) + 100
                  )}`}</h3>
                  <h3 className=" text-xs pl-1  text-green-800">
                    {"(33% off)"}
                  </h3>
                </div>

                <button
                  className="text-xs justify-center items-center py-2 flex self-center my-1 w-full border rounded-md border-slate-900 bg-white"
                  onClick={() => {
                    onPressCart(callout);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CatWiseProducts;
