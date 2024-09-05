"use client";

import React, { useState, useEffect, useRef } from "react";
import Calendar from "./Calendar";
import EventModal from "./EventModal";
import Header from "./Header";
import TimelineView from "./TimelineView";
import { useParams } from "next/navigation";
import { useTripContext } from "@/context/TripContext";

const EventCalendar = () => {
  const params = useParams();
  const tripId = params.tripId;

  const { eventsData } = useTripContext();
  const { events, fetchEventsByTripId, createEvent, updateEvent, deleteEvent } =
    eventsData;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // New state for selected date

  const timelineRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      const currentTimePosition = getTimePosition(currentTime);
      timelineRef.current.scrollTop = currentTimePosition - 100; // Scroll to current time minus some offset
    }
  }, [currentTime]);

  useEffect(() => {
    const fetchEvents = async () => {
      await fetchEventsByTripId(tripId);
    };

    fetchEvents();
  }, [tripId]);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedEvent(null);
    setIsEditModalOpen(false);
  };

  const addEvent = (newEvent) => {
    createEvent({ ...newEvent, tripId });
    closeCreateModal();
  };

  const updateEvents = (updatedEvent) => {
    updateEvent(updatedEvent._id, { ...updatedEvent });
    // setEvents(
    //   events.map((event) =>
    //     event.id === updatedEvent.id ? updatedEvent : event
    //   )
    // );
    closeEditModal();
  };

  const deleteEvents = (eventId) => {
    deleteEvent(tripId, eventId);
    // setEvents(events.filter((event) => event.id !== eventId));
    closeEditModal();
  };

  const getTimePosition = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (hours * 60 + minutes) * 2; // 2px per minute
  };

  return (
    <div className="w-full h-[90vh] mx-auto bg-backgroundGray p-6 rounded-lg">
      <Header openCreateModal={openCreateModal} />
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate} // Pass selected date to Calendar
        setSelectedDate={setSelectedDate} // Pass setSelectedDate function to Calendar
        events={events}
      />
      <TimelineView
        events={events.filter(
          (event) =>
            new Date(event.date).toDateString() === selectedDate.toDateString()
        )} // Filter events for the selected date
        openEditModal={openEditModal}
        currentTime={currentTime}
        timelineRef={timelineRef}
      />
      {isCreateModalOpen && (
        <EventModal
          onClose={closeCreateModal}
          onSave={addEvent}
          isOpen={true}
        />
      )}
      {isEditModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeEditModal}
          onSave={updateEvents}
          onDelete={deleteEvents}
          isOpen={true}
        />
      )}
    </div>
  );
};

export default EventCalendar;
