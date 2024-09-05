"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useTripContext } from "@/context/TripContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const categories = ["transport", "hotel", "others"];

const totalExpense = (expenses) => {
  return expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
};

const calculatePercentage = (amount, totalValue) => {
  return ((amount / totalValue) * 100).toFixed(1);
};

const calculatePixels = (percentage) => {
  const base = 70;
  const ceiling = 130;
  const diff = ceiling - base;
  const scaler = 0.9;
  const multiplier = diff * Math.pow(percentage / 100, scaler);
  return multiplier ? multiplier + base : 0;
};

function darkenColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) - amount)).toString(16)
        ).substr(-2)
      )
  );
}

export default function ExpensesBubbleChart() {
  const params = useParams();
  const tripId = params.tripId; // Fetch the tripId from the URL
  const { tripsData } = useTripContext();
  const { trips, loading } = tripsData; // Assuming tripsData contains a loading state

  // Find the trip by tripId
  const trip = trips.find((trip) => trip._id == tripId);

  // Generate dynamic expense data for each category
  const expensesData = [];

  if (trip && trip.expenses) {
    const totalExpenses = totalExpense(trip.expenses);

    categories.forEach((category, index) => {
      const expense = trip.expenses.find(
        (exp) => exp.category === category
      ) || {
        category,
        amount: 0,
      };

      const percentage = calculatePercentage(expense.amount, totalExpenses);
      const size = calculatePixels(percentage);

      // Assign default positions (top, left) or calculate based on index
      const positions = [
        { top: "30%", left: "52%" },
        { top: "68%", left: "28%" },
        { top: "62%", left: "72%" },
      ];

      const colors = ["#4ade80", "#818cf8", "#fb923c"]; // Default color scheme

      expensesData.push({
        percentage,
        color: colors[index] || "#ccc", // Fallback to gray if more categories
        category: expense.category,
        size,
        top: positions[index]?.top || "50%", // Fallback for dynamic positioning
        left: positions[index]?.left || "50%",
      });
    });
  }

  return (
    <div className="bg-backgroundGray md:w-full max-h-80  md:p-6 m-4 rounded-lg max-w-md mx-auto">
      {/* Header for expenses */}
      <h2 className=" md:text-left text-center  font-normal text-gray-400 mb-4">
        Expenses
      </h2>

      {/* Bubble chart area */}
      <div className="relative h-56 md:w-full w-[60%] mx-auto mb-4">
        {loading || !trip || !trip.expenses ? (
          <LoadingSpinner />
        ) : (
          expensesData.map((item, index) => (
            <div
              key={index}
              className="absolute rounded-full flex items-center justify-center text-white font-bold"
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                top: item.top,
                left: item.left,
                fontSize: `${item.size / 6}px`,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle at 30% 30%, ${
                  item.color
                }, ${darkenColor(item.color, 30)})`,
                opacity: 0.9,
                zIndex: 3 - index,
              }}
            >
              {item.percentage}%
            </div>
          ))
        )}
      </div>

      {/* Category list */}
      <div className="flex md:justify-start justify-center items-center space-x-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: expensesData[index]?.color || "#ccc" }}
            ></div>
            <span className="text-sm text-gray-600 font-medium">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
