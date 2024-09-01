import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { temp, weather, city, forecast } = weatherData;

  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-12 h-12"
          />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">{Math.round(temp)}°</h2>
            <p className="text-gray-500">{city}</p>
          </div>
        </div>
        <div>
          <button className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        {forecast.map((day, index) => (
          <div key={index} className="text-center">
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="w-8 h-8 mx-auto"
            />
            <p className="mt-2 text-lg font-medium">{Math.round(day.temp)}°</p>
            <p className="text-gray-500">{day.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
