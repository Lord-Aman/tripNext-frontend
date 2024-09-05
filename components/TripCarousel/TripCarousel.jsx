"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import CloudYellow from "@/public/images/cloud_yellow.png";
import beachDeep from "@/public/images/beach_deep_blue.png";
import planeLight from "@/public/images/plane_light_blue.png";
import treesGreen from "@/public/images/trees_green.png";
import ArrowLeft from "@/public/icons/ArrowLeft.svg";
import ArrowRight from "@/public/icons/ArrowRight.svg";

import useResizer from "@/hooks/useResizer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const trips = [
  { id: 1, name: "Spain", image: CloudYellow },
  { id: 2, name: "Italy", image: beachDeep },
  { id: 3, name: "France", image: planeLight },
  { id: 4, name: "Germany", image: treesGreen },
];

export default function TripCarousel() {
  const isMobile = useResizer();
  const [cardIndex, setCardIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCardIndex(swiper?.activeIndex);
  };

  return (
    <div
      className={`${
        isMobile ? "w-[90vw] h-[20vh] bg-no-repeat" : "max-w-3xl h-80"
      } mt-4 bg-cover mx-auto relative`}
      style={{
        backgroundImage: `url(${trips[cardIndex].image.src})`,
        backgroundSize: isMobile ? "contain" : "cover",
      }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {trips.map((trip) => (
          <SwiperSlide key={trip.id}>
            <div
              className={`flex flex-col items-start justify-center h-full rounded-3xl ${
                isMobile ? "p-4 mt-4" : "p-8"
              } w-full`}
            >
              <h2 className="text-sm font-medium mb-2 sm:text-lg">
                Nearest trip
              </h2>
              <h1 className="text-3xl font-bold sm:text-6xl">{trip.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {
        <div className="absolute bottom-2 sm:bottom-8 left-4 md:left-8 flex space-x-4">
          {/* Previous Button */}
          <button className="custom-prev flex items-center justify-center  sm:w-8  md:w-10  sm:h-8 w-6 md:h-10 rounded-full bg-white shadow-lg">
            <Image src={ArrowLeft} alt="Previous" />
          </button>

          {/* Next Button */}
          <button className="custom-next flex items-center justify-center sm:w-8 sm:h-8 w-6 md:w-10  md:h-10 rounded-full bg-white shadow-lg">
            <Image src={ArrowRight} alt="Next" />
          </button>
        </div>
      }
    </div>
  );
}
