"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreVertical,
  Plane,
  Bus,
  Home,
} from "lucide-react";

const Timeline = () => {
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <Header openCreateModal={openCreateModal} />
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        events={events}
      />
      <TimelineView
        events={events}
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

const Header = ({ openCreateModal }) => (
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Timeline</h1>
    <button
      onClick={openCreateModal}
      className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center"
    >
      Add event
      <Plus className="ml-2 h-5 w-5" />
    </button>
  </header>
);

const Calendar = ({ currentDate, setCurrentDate, events }) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const hasEventOnDate = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events.some(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth}>
            <ChevronLeft className="h-6 w-6 text-gray-400" />
          </button>
          <button onClick={nextMonth}>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-gray-400 text-sm">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              h-8 w-8 flex items-center justify-center rounded-full text-sm relative
              ${day === currentDate.getDate() ? "bg-blue-500 text-white" : ""}
              ${day ? "text-gray-700" : "text-gray-300"}
            `}
          >
            {day}
            {day && hasEventOnDate(day) && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelineView = ({ events, openEditModal, currentTime, timelineRef }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event) => {
    const startMinutes =
      parseInt(event.startTime.split(":")[0]) * 60 +
      parseInt(event.startTime.split(":")[1]);
    const endMinutes =
      parseInt(event.endTime.split(":")[0]) * 60 +
      parseInt(event.endTime.split(":")[1]);
    const top = startMinutes * 2; // 2px per minute
    const height = (endMinutes - startMinutes) * 2;

    return {
      position: "absolute",
      top: `${top}px`,
      height: `${height}px`,
      left: "60px",
      right: "0",
    };
  };

  const getCurrentTimePosition = () => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return minutes * 2; // 2px per minute
  };

  return (
    <div className="relative h-[400px] overflow-y-auto" ref={timelineRef}>
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "2880px" }}
      >
        {" "}
        {/* 24 hours * 60 minutes * 2px */}
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex items-center"
            style={{ height: "120px" }}
          >
            {" "}
            {/* 60 minutes * 2px */}
            <span className="w-12 text-xs text-gray-400">
              {hour.toString().padStart(2, "0")}:00
            </span>
            <div className="flex-1 border-t border-gray-200 ml-2"></div>
          </div>
        ))}
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => openEditModal(event)}
            className={`rounded-lg p-3 mb-4 cursor-pointer absolute left-14 right-0 ${
              event.type === "flight"
                ? "bg-blue-100"
                : event.type === "bus"
                ? "bg-green-100"
                : "bg-orange-100"
            }`}
            style={getEventStyle(event)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {event.type === "flight" && (
                  <Plane className="h-5 w-5 text-blue-500 mr-2" />
                )}
                {event.type === "bus" && (
                  <Bus className="h-5 w-5 text-green-500 mr-2" />
                )}
                {event.type === "hotel" && (
                  <Home className="h-5 w-5 text-orange-500 mr-2" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      event.type === "flight"
                        ? "text-blue-500"
                        : event.type === "bus"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.startTime} • {event.endTime}
                  </p>
                </div>
              </div>
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
        <div
          className="absolute left-0 right-0 h-0.5 bg-blue-500 z-10"
          style={{ top: `${getCurrentTimePosition()}px` }}
        ></div>
        <div
          className="absolute left-0 w-12 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs z-20"
          style={{ top: `${getCurrentTimePosition() - 12}px` }}
        >
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

const EventModal = ({ event, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [date, setDate] = useState(event ? event.date : "");
  const [startTime, setStartTime] = useState(event ? event.startTime : "");
  const [endTime, setEndTime] = useState(event ? event.endTime : "");
  const [type, setType] = useState(event ? event.type : "flight");

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, date, startTime, endTime, type };
    if (event) {
      onSave({ ...event, ...eventData });
    } else {
      onSave(eventData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {event ? "Edit Event" : "Create New Event"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="flight">Flight</option>
            <option value="bus">Bus</option>
            <option value="hotel">Hotel</option>
          </select>
          <div className="flex justify-between">
            {event && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
            <div>
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {event ? "Update" : "Add Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Timeline;
