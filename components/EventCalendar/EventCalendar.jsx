"use client";

import React, { useState, useEffect, useRef } from "react";
import Calendar from "./Calendar";
import EventModal from "./EventModal";
import Header from "./Header";
import TimelineView from "./TimelineView";

const EventCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Warsaw → Rome",
      date: "2023-09-17",
      startTime: "08:00",
      endTime: "09:15",
      type: "flight",
    },
    {
      id: "2",
      title: "Bus transfer",
      date: "2023-09-17",
      startTime: "09:30",
      endTime: "10:00",
      type: "bus",
    },
    {
      id: "3",
      title: "Check into a hotel",
      date: "2023-09-17",
      startTime: "10:00",
      endTime: "10:40",
      type: "hotel",
    },
  ]);

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
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    closeCreateModal();
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    closeEditModal();
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
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
        <EventModal onClose={closeCreateModal} onSave={addEvent} />
      )}
      {isEditModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeEditModal}
          onSave={updateEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
};

export default EventCalendar;
