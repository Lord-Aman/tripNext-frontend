// app/page.js
import React from "react";
import WeatherCard from "@/components/Weather/WeatherCard";
import WeatherCardLocation from "@/components/Weather/WeatherCardLocation";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <WeatherCard />
      {/* <WeatherCardLocation /> */}
    </div>
  );
}
