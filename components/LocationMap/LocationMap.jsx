"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useTripContext } from "@/context/TripContext";
import { useParams } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationMap.css";

// Custom hook to fly to the new map center
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.5 }); // Smoothly move to the new center with flyTo
    }
  }, [center, map]);

  return null; // No visual output from this component
};

const LocationMap = () => {
  const params = useParams();
  const tripId = params.tripId;
  const { tripsData } = useTripContext();
  const { trips } = tripsData;
  const trip = trips.find((t) => t._id === tripId);

  const [center, setCenter] = useState([41.9028, 12.4964]); // Default to Rome
  const [locationName, setLocationName] = useState("Rome");

  useEffect(() => {
    if (trip) {
      setLocationName(trip.destinationCountry);
    }
  }, [trip]);

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
    if (locationName) {
      fetchCoordinates(locationName);
    }
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
          <MapUpdater center={center} />{" "}
          {/* Component to fly the map to the new center */}
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
