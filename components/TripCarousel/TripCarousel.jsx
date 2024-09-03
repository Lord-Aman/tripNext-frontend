"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "@/public/icons/ArrowLeft.svg";
import ArrowRight from "@/public/icons/ArrowRight.svg";
import Image from "next/image";
import RomeImage from "@/public/images/Rome.png";

import useResizer from "@/hooks/useResizer";
import "./TripCarousel.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const trips = [
  { id: 1, name: "Spain" },
  { id: 2, name: "Italy" },
  { id: 3, name: "France" },
  { id: 4, name: "Germany" },
  { id: 5, name: "Portugal" },
];

export default function TripCarousel() {
  const isMobile = useResizer();

  return (
    <div
      className="max-w-3xl mt-4  bg-cover  h-80 mx-auto relative"
      style={{
        backgroundImage: `url(${RomeImage.src})`,
      }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={
          isMobile
            ? false
            : {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }
        }
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {trips.map((trip) => (
          <SwiperSlide key={trip.id}>
            <div className="flex flex-col items-start justify-center h-full rounded-3xl p-8  w-full">
              <h2 className="text-lg font-medium mb-4">Nearest trip</h2>
              <h1 className="text-6xl font-bold">{trip.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMobile && (
        <div className="flex mt-8 absolute bottom-8 left-8">
          <button className="swiper-button-prev  rounded-full flex items-center justify-center mr-4 focus:outline-none shadow-md" />
          <button className="swiper-button-next rounded-full  flex items-center justify-center focus:outline-none shadow-md" />
        </div>
      )}
    </div>
  );
}
