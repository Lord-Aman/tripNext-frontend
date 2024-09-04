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
    <div className="w-full mx-auto sm:px-6 md:px-2">
      <div className="flex flex-col lg:flex-row space-x-4">
        <div className="w-full flex flex-col items-start justify-start md:w-3/4 lg:pr-8">
          {/* Carousel and Expenses Chart  */}
          <div className="flex flex-row">
            <div className="mb-8 w-3/4">
              <TripCarousel />
            </div>
            <div className="mb-8 w-1/4">
              <ExpensesBubbleChart />
            </div>
          </div>

          {/* Trip Cards  */}
          <div className="w-full">
            <TravelCards />
          </div>

          <div className="w-full flex space-x-8 p-4">
            <div className="w-1/4">
              <LocationMap />
            </div>
            <div className="w-3/4">
              <TodoList />
            </div>
          </div>
        </div>
        <div className="w-full h-screen md:w-1/4 mt-8 lg:mt-0">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
}
