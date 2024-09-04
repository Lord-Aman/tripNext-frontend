import { useState, useEffect } from "react";

const backend_endpoint = process.env.NEXT_PUBLIC_TRIPNEXT_BACKEND_ENDPOINT;

const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all trips
  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/trips`);
      if (!response.ok) throw new Error("Failed to fetch trips");
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new trip
  const createTrip = async (tripData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
      if (!response.ok) throw new Error("Failed to create trip");
      const newTrip = await response.json();
      setTrips((prevTrips) => [...prevTrips, newTrip]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a trip by ID
  const updateTrip = async (id, tripData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/trips/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
      if (!response.ok) throw new Error("Failed to update trip");
      const updatedTrip = await response.json();
      setTrips((prevTrips) =>
        prevTrips.map((trip) => (trip.id === id ? updatedTrip : trip))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a trip by ID
  const deleteTrip = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/trips/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete trip");
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get trips by userId
  const fetchTripsByUserId = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/trips/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch trips for user");
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load to fetch trips
  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    fetchTripsByUserId,
  };
};

export default useTrips;
