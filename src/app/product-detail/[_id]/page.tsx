"use client";
import { StarIcon } from "@heroicons/react/20/solid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/components/style.css";
import { fetchProductDetail } from "@/services/productServices";
import { addToCart } from "@/lib/slices/cartSlice";
import { useEffect, useState } from "react";
import DetailHeader from "@/components/detailHeader";
import Navbar from "@/components/nav-bar";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail({ params }: any) {
  const [productInfo, setProductInfo] = useState<any>({});
  console.log("productInfo", productInfo);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const fetchDetails = async () => {
    const productInfo = await fetchProductDetail(params?._id);
    setProductInfo(productInfo?.data);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const onPressCart = () => {
    dispatch(addToCart(productInfo));
    toast.success("Item added to cart");
  };
  return (
    <div className="">
      <div className="lg:hidden">
        <DetailHeader
          cartCount={cart?.cartCount || 0}
          title={productInfo?.title}
        />
      </div>
      <div className="hidden lg:flex pb-16">
        <Navbar cartCount={cart?.cartCount || 0} />
      </div>

      {/* Image gallery */}
      <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-full hidden overflow-hidden rounded-lg lg:block">
          <Carousel
            showStatus={false}
            renderThumbs={(children: any) => {
              return children?.map((item: any) => (
                <img
                  src={item?.props?.children?.props?.src}
                  className="h-20 w-full object-fil"
                />
              ));
            }}
            renderArrowNext={() => null}
            renderIndicator={() => null}
            renderArrowPrev={() => null}
          >
            <div className="aspect-h-3  aspect-w-3 overflow-hidden">
              {productInfo?.images?.length && (
                <img
                  src={productInfo?.images[0]}
                  className="h-full w-full object-fill"
                />
              )}
            </div>
            <div className="aspect-h-3 aspect-w-3 overflow-hidden">
              {productInfo?.images?.length && (
                <img
                  src={productInfo?.images[0]}
                  className="h-full w-full object-fill"
                />
              )}
            </div>
          </Carousel>
        </div>
        <div className="lg:hidden">
          <Carousel
            showStatus={false}
            renderThumbs={(children: any) => {
              return children?.map((item: any) => (
                <img
                  src={item?.props?.children?.props?.src}
                  className="h-20 w-full object-fill"
                />
              ));
            }}
            renderArrowNext={() => null}
            renderIndicator={() => null}
            renderArrowPrev={() => null}
          >
            <div className="aspect-h-3  aspect-w-3 overflow-hidden">
              {productInfo?.images?.length && (
                <img
                  src={productInfo?.images[0]}
                  className="h-full w-full object-fill"
                />
              )}
            </div>
            <div className="aspect-h-3 aspect-w-3 overflow-hidden">
              {productInfo?.images?.length && (
                <img
                  src={productInfo?.images[0]}
                  className="h-full w-full object-fill"
                />
              )}
            </div>
          </Carousel>
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-2 sm:px-6 lg:grid lg:max-w-7xl">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {productInfo?.title}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-2 lg:row-span-3 lg:mt-0">
          <div className="flex flex-row items-center">
            <h3 className="text-xl font-medium">{`₹${productInfo.price}`}</h3>
            <h3 className="text-xl line-through pl-1 text-gray">{`₹${Number(
              Number(productInfo.price) + 100
            )}`}</h3>
            <h3 className=" text-lg pl-1  text-green-800">{"(33% off)"}</h3>
          </div>
          {/* Reviews */}
          <div className="mt-4">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          <div className="pt-4 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {productInfo?.description}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPressCart();
            }}
            type="submit"
            className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-slate px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add to bag
          </button>
        </div>
      </div>
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
