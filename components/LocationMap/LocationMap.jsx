"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationMap.css";

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

  // Custom icon for the marker
  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {center ? (
        <MapContainer
          center={center}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-[500px] md:w-[300px] md:h-[500px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center} icon={customIcon}>
            <Tooltip>{locationName}</Tooltip>
          </Marker>
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
