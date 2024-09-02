'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const TripSwiper = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        className="rounded-lg shadow-lg overflow-hidden"
      >
        <SwiperSlide>
          <div className="bg-yellow-200 p-8 rounded-lg">
            <h3 className="text-sm text-gray-700 mb-2">Nearest trip</h3>
            <h2 className="text-4xl font-bold text-black">Spain</h2>
            <div className="absolute left-2 bottom-2 flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Additional slides can be added here */}
        <SwiperSlide>
          <div className="bg-yellow-200 p-8 rounded-lg">
            <h3 className="text-sm text-gray-700 mb-2">Nearest trip</h3>
            <h2 className="text-4xl font-bold text-black">Italy</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-200 p-8 rounded-lg">
            <h3 className="text-sm text-gray-700 mb-2">Nearest trip</h3>
            <h2 className="text-4xl font-bold text-black">France</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TripSwiper;
