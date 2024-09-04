"use client";

import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Button from "@/components/Button/Button";
import { useTripContext } from "@/context/TripContext";
import NewTripModal from "@/components/NewTripModal/NewTripModal";
import CloudYellow from "@/public/images/cloud_yellow.png";
import planeLight from "@/public/images/plane_light_blue.png";
import treesGreen from "@/public/images/trees_green.png";
import useResizer from "@/hooks/useResizer";
import Link from "next/link";

// Function to calculate trip duration
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return duration;
};

// Dummy data for trips
const backgroundImages = [
  { image: CloudYellow },
  { image: planeLight },
  { image: treesGreen },
];

export default function TripList() {
  const { tripsData } = useTripContext();
  const { trips } = tripsData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useResizer();

  return (
    <div className="h-screen bg-backgroundGray flex flex-col">
      {/* Heading */}
      <div className="container px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          All Trips
        </h1>
      </div>

      {/* Trip list */}
      <div className="container mx-auto px-4 py-2  mb-12 flex-grow overflow-auto">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trips.map((trip, index) => (
              <div
                key={trip._id}
                className={`relative overflow-hidden rounded-xl shadow-lg h-56 md:h-80 min-w-80 w-full`}
                style={{
                  backgroundImage: `url(${
                    backgroundImages[index % backgroundImages.length].image.src
                  })`,
                  backgroundSize: isMobile ? "cover" : "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-black text-sm font-semibold mt-4 flex items-center">
                      <Sun size={16} className="mr-1" />
                      {calculateDuration(trip.startDate, trip.endDate)} days,
                      <Moon size={16} className="ml-2 mr-1" />
                      {calculateDuration(trip.startDate, trip.endDate) - 1}{" "}
                      nights
                    </p>
                    <h2 className="text-black text-2xl font-bold">
                      {trip.tripName}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-black text-xl font-semibold">
                      {trip.sourceCountry} → {trip.destinationCountry}
                    </h3>
                    <p className="text-black text-sm">
                      {new Date(trip.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(trip.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Link href={`/trips/${trip._id}`}>
                      <button className="w-full bg-white text-black py-3 px-4 rounded-full text-sm font-semibold hover:bg-opacity-90 mt-4 transition duration-300">
                        View trip
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center py-16">
            <p className="text-2xl text-gray-600 mb-8">
              Enjoy moments by planning a trip.
            </p>
            <Button
              className="bg-customBlue h-12 max-w-64 text-black rounded-lg shadow-custom"
              text="New Trip"
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <NewTripModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
