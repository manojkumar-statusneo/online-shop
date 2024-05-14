import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};
const externaImageLoader = ({ src }: any) => `${src}`;

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
    <div className="px-4 relative sm:px-6 lg:px-4 pb-4">
      <div className="max-w-2xl sm:py-2 lg:max-w-none lg:py-8">
        <h2 className="text-2xl py-2 text-center text-gray-900 lg:text-3xl">
          {props?.title}
        </h2>
      </div>
      <div className="my-4 lg:my-1">
        <Carousel
          swipeable={true}
          draggable={false}
          //showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          transitionDuration={700}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
          //renderDotsOutside={true}
        >
          {props?.products?.map((callout: any) => (
            <div key={callout._id} className="mx-2 items-center ">
              <Link href={`/product-detail/${callout._id}`}>
                <div className=" relative h-48  min-w-full overflow-hidden  sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-1">
                  <Image
                    loader={externaImageLoader}
                    fill
                    src={callout?.images && callout?.images[0]}
                    alt={callout?.images && callout?.images[0]}
                  />
                </div>
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
                    props.onPressCart(callout);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default HorizontalList;
