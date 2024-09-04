import { useState, useEffect } from "react";

const backend_endpoint = process.env.NEXT_PUBLIC_TRIPNEXT_BACKEND_ENDPOINT;

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventsByTripId = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/events/trip/${tripId}`);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const newEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${backend_endpoint}/events/${id}`, { method: "DELETE" });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEventsByTripId,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export default useEvents;
