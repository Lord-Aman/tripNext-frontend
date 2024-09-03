import React from "react";
import TripCarousel from "@/components/TripCarousel/TripCarousel";
import ExpensesBubbleChart from "@/components/ExpenseBubbleChart/ExpenseBubbleChart";
import EventCalendar from "@/components/EventCalendar/EventCalendar";
import TodoList from "@/components/Todo/Todo";
import TravelCards from "@/components/TravelCards/TravelCards";

export default function Home() {
  return (
    <div className="w-full mx-auto sm:px-6 md:px-2">
      <div className="flex flex-col lg:flex-row space-x-4">
        <div className="w-full flex items-start justify-center md:w-3/4 lg:pr-8">
          <div className="mb-8 w-3/4">
            <TripCarousel />
          </div>
          <div className="mb- 8 w-1/4">
            <ExpensesBubbleChart />
          </div>
          {/* <TravelCards /> */}
          {/* <TodoList /> */}
        </div>
        <div className="w-full h-screen md::w-1/4 mt-8 lg:mt-0">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
}
