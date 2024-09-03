"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Bus, Element2, Airplane } from "iconsax-react";

import { calculateHeight, calculateTopPosition } from "@/utils/timeUtils";

const events = {
  "2022-09-01": [
    {
      time: "01:00 AM",
      title: "Warsaw Rome",
      duration: "01:00 - 03:00",
      color: "#82bdf9",
      textColor: "#177ade",
      iconBgColor: "#177ade",
      iconColor: "#82bdf9",
      icon: <Airplane size="32" />,
    },
    {
      time: "02:00 PM",
      title: "Bus Transfer",
      duration: "03:00 - 03:30",
      color: "#cdf9e4",
      textColor: "#28e388",
      iconBgColor: "#28e388",
      iconColor: "#cdf9e4",
      icon: <Bus size="32" />,
    },
    {
      time: "08:00 PM",
      title: "Check into a Hotel",
      duration: "04:00 - 08:00",
      color: "#f58c15",
      textColor: "#f8dcbc",
      iconBgColor: "#f8dcbc",
      iconColor: "#f58c15",
      icon: <Element2 size="32" />,
    },
  ],
  "2022-09-02": [
    {
      time: "09:00 AM",
      title: "Meeting with Client",
      duration: "09:00 - 10:00",
      color: "#ADD8E6",
      textColor: "#000000",
      iconBgColor: "#000000",
      iconColor: "#ADD8E6",
      icon: <Airplane size="32" />,
    },
    {
      time: "11:00 AM",
      title: "Project deadline",
      duration: "11:00 - 12:00",
      color: "#FFB6C1",
      textColor: "#000000",
      iconBgColor: "#000000",
      iconColor: "#FFB6C1",
      icon: <Bus size="32" />,
    },
    {
      time: "01:00 PM",
      title: "Lunch Break",
      duration: "01:00 - 02:00",
      color: "#90EE90",
      textColor: "#000000",
      iconBgColor: "#000000",
      iconColor: "#90EE90",
      icon: <Element2 size="32" />,
    },
    {
      time: "03:00 PM",
      title: "Appointment",
      duration: "03:00 - 03:30",
      color: "#E6E6FA",
      textColor: "#000000",
      iconBgColor: "#000000",
      iconColor: "#E6E6FA",
      icon: <Bus size="32" />,
    },
    {
      time: "05:00 PM",
      title: "Evening Review",
      duration: "05:00 - 06:00",
      color: "#FFDAB9",
      textColor: "#000000",
      iconBgColor: "#000000",
      iconColor: "#FFDAB9",
      icon: <Airplane size="32" />,
    },
  ],
};

export default function EventCalendarV1() {
  const [selectedDate, setSelectedDate] = useState(dayjs("2022-09-01"));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate || dayjs());
  };

  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const selectedEvents = events[formattedDate] || [];

  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
    const displayHour = hour < 10 ? `0${hour}` : `${hour}`;
    return `${displayHour}:00`;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white border border-gray-300 rounded-lg w-fit m-3">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-white rounded-lg"
        />
      </div>

      <div className="mt-6 p-4 rounded-lg w-fit flex m-3">
        <div className="w-16 pr-4">
          {timeSlots.map((time, index) => (
            <div key={time} className="relative" style={{ height: "60px" }}>
              <div
                className="text-gray-600 absolute left-0"
                style={{ top: `${index * 60}px` }}
              >
                {time}
              </div>
              <div
                className="border-b border-gray-200 absolute"
                style={{
                  top: `${index * 60 + 30}px`,
                  left: "0",
                  width: "300px",
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex-grow pl-8">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => {
              const [startTime, endTime] = event.duration.split(" - ");
              return (
                <div key={index} className="mb-6 relative">
                  <div
                    className="flex items-start justify-start border border-gray-300 rounded-xl"
                    style={{
                      height: calculateHeight(startTime, endTime),
                      width: "210px",
                      backgroundColor: event.color,
                      color: event.textColor,
                      position: "absolute",
                      top: calculateTopPosition(startTime),
                    }}
                  >
                    <div className="flex-grow flex items-start p-2 rounded-xl w-full">
                      <p
                        className="bg-black rounded-full p-1"
                        style={{
                          backgroundColor: event.iconBgColor,
                          color: event.iconColor,
                        }}
                      >
                        {event.icon}
                      </p>
                      <div className="ml-3 flex flex-col justify-start">
                        <p className="font-bold">{event.title}</p>
                        <p className="font-semibold">{event.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No events for this date</p>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}
