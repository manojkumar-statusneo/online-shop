import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const externaImageLoader = ({ src }: any) => `${src}`;
const HeroItems = ({ heroSection }: any) => {
  return (
    <Carousel
      // autoPlay
      interval={2000}
      infiniteLoop
      autoFocus
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
      showIndicators={true}
      transitionTime={500}
    >
      {heroSection?.map((item: any, index: number) => (
        <div className="h-72 px-2 lg:h-96" key={index}>
          <Image src={item?.image} loader={externaImageLoader} alt="1" fill />
        </div>
      ))}
    </Carousel>
  );
};
export default HeroItems;
