"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = ({ locationName = "Rome" }) => {
  const [center, setCenter] = useState(null);

  const fetchCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (!isNaN(lat) && !isNaN(lon)) {
          setCenter([lat, lon]);
        } else {
          console.error("Invalid coordinates received");
        }
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    fetchCoordinates(locationName);
  }, [locationName]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {center ? (
        <MapContainer
          center={center}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-[300px] h-[500px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
