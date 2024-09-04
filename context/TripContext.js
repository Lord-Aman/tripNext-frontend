"use client";

import { createContext, useContext } from "react";
import useTrips from "../hooks/useTrips";
import useEvents from "../hooks/useEvents";
import useTodos from "../hooks/useTodos";

// Create the context
const TripContext = createContext();

// Create a custom hook to access the context
export const useTripContext = () => {
  return useContext(TripContext);
};

// Create a provider that combines all data and CRUD operations for trips, events, and todos
export const TripProvider = ({ children }) => {
  const tripsData = useTrips();
  const eventsData = useEvents();
  const todosData = useTodos();

  return (
    <TripContext.Provider value={{ tripsData, eventsData, todosData }}>
      {children}
    </TripContext.Provider>
  );
};
