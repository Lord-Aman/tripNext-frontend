"use client";

// components/WeatherCard.js
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useUserLocation from "@/hooks/useUserLocation";

// Importing images using @/ alias
import sunnyIcon from "@/public/icons/sunny.svg";
import cloudyIcon from "@/public/icons/cloudy.svg";
import partlyCloudyIcon from "@/public/icons/partly-cloudy.svg";
import thunderstormIcon from "@/public/icons/thunderstorm.svg";

const WeatherCardLocation = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location, error } = useUserLocation();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const fetchWeatherData = async () => {
        try {
          // TODO: Update to use process.env here
          const API_KEY = "509d81ffc2474dacb23143524232306";
          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&days=5&aqi=yes`
          );
          const data = await res.json();

          // Extracting relevant data for the weather card
          const weatherData = data.forecast.forecastday.map((day) => ({
            temp: day.day.avgtemp_c,
            location: `${data.location.name}, ${data.location.region}`,
          }));

          setWeatherData(weatherData);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const weeklyData = [
    { icon: cloudyIcon, temp: weatherData[0]?.temp, day: "Mo" },
    { icon: partlyCloudyIcon, temp: weatherData[1]?.temp, day: "Tu" },
    { icon: sunnyIcon, temp: weatherData[2]?.temp, day: "We" },
    { icon: thunderstormIcon, temp: weatherData[3]?.temp, day: "Th" },
    { icon: sunnyIcon, temp: weatherData[4]?.temp, day: "Fr" },
  ];

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={sunnyIcon} alt="Sunny" width={48} height={48} />
            <div className="ml-4">
              <div className="text-4xl font-bold">
                {weeklyData[0]?.temp}&#176;
              </div>
              <div className="text-gray-500">{weatherData[0]?.location}</div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600">
            {weeklyData.map((data, index) => (
              <div className="flex flex-col items-center" key={index}>
                <Image src={data.icon} alt={data.day} width={24} height={24} />
                <div>{data.temp}&#176;</div>
                <div>{data.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardLocation;
