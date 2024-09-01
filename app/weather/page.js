"use client";

import React, { useState, useEffect } from "react";
import WeatherCard from "@/components/Weather/WeatherCard";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const apiKey = "a9bb5339dc7fb2cc7ab27df172ac6397"; // Replace with your OpenWeatherMap API key
      const city = "Rome";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      const currentTemp = data.main.temp;
      const currentWeather = {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      const forecast = forecastData.list.slice(0, 5).map((item) => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        return {
          day,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      });

      setWeatherData({
        temp: currentTemp,
        weather: currentWeather,
        city: city,
        forecast: forecast,
      });
    }

    fetchWeather();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
