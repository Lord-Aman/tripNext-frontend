import React from "react";
import TripCarousel from "@/components/TripCarousel/TripCarousel";
import ExpensesBubbleChart from "@/components/ExpenseBubbleChart/ExpenseBubbleChart";
import EventCalendar from "@/components/EventCalendar/EventCalendar";
import TodoList from "@/components/Todo/Todo";
import TravelCards from "@/components/TravelCards/TravelCards";
import LocationMap from "@/components/LocationMap/LocationMap";
import EventCalendarV2 from "@/components/EventCalendar/EventCalendarV2";

export default function Home() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-3/4 flex flex-col items-start justify-start lg:pr-8">
          {/* Carousel and Expenses Chart */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-8 w-full md:w-2/3 lg:w-3/4">
              <TripCarousel />
            </div>
            <div className="mb-8 w-full md:w-1/3 lg:w-1/4">
              <ExpensesBubbleChart />
            </div>
          </div>

          {/* Trip Cards */}
          <div className="w-full mb-8">
            <TravelCards />
          </div>

          <div className="w-full flex flex-col md:flex-row md:space-x-4 lg:space-x-8 p-4">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
              <LocationMap />
            </div>
            <div className="w-full md:w-1/2 lg:w-3/4">
              <TodoList />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4 h-auto lg:h-screen mt-8 lg:mt-0">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
}
