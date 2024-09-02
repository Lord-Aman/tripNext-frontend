"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format, addDays } from "date-fns";

// Importing images and icons
import sunnyIcon from "@/public/icons/sunny.svg";
import partlyCloudyIcon from "@/public/icons/partly-cloudy.svg";
import thunderstormIcon from "@/public/icons/thunderstorm.svg";

const WeatherCard = ({ location = "Bengaluru" }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        //TODO: Add it to env variable
        const API_KEY = "509d81ffc2474dacb23143524232306";
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch weather data: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (!data.forecast || !data.forecast.forecastday) {
          throw new Error("Invalid API response structure");
        }

        // Extracting relevant data for the weather card
        const weatherData = data.forecast.forecastday.map((day) => ({
          temp: day.day.avgtemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          isDay: day.day.condition.icon.includes("day"),
          date: day.date,
          location: `${data.location.name}, ${data.location.region}`,
        }));

        setWeatherData(weatherData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Use date-fns to get the actual day names
  const dayNames = weatherData.map((dayData, index) =>
    format(addDays(new Date(), index), "EEE")
  );

  const weatherIcons = [sunnyIcon, partlyCloudyIcon, thunderstormIcon];

  const weeklyData = weatherData.map((dayData, index) => {
    const weatherMapping = {
      image: dayData.icon,
      icon: weatherIcons[index % 3],
    };

    return {
      image: weatherMapping.image,
      icon: weatherMapping.icon,
      temp: dayData.temp,
      day: dayNames[index],
    };
  });

  return (
    <div className="max-w-xs mx-auto bg-[#FAF9FF] h-52 w-56 mb-4 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https:${weeklyData[0]?.image}`}
              alt="Weather"
              width={55}
              height={55}
            />
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
                <div className="font-bold">{data.temp}&#176;</div>
                <div>{data.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
