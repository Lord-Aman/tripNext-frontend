"use client";

import React from "react";

const expenseData = [
  {
    category: "Transport",
    value: 5,
  },
  {
    category: "Hotel",
    value: 5,
  },
  {
    category: "Other",
    value: 90,
  },
];

const totalExpense = expenseData.reduce(
  (total, expense) => total + expense.value,
  0
);

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

const expensesData = [
  {
    percentage: calculatePercentage(expenseData[0].value, totalExpense),
    color: "#4ade80",
    category: "Transport",
    size: calculatePixels(
      calculatePercentage(expenseData[0].value, totalExpense)
    ),
    top: "30%",
    left: "52%",
  },
  {
    percentage: calculatePercentage(expenseData[1].value, totalExpense),
    color: "#818cf8",
    category: "Hotel",
    size: calculatePixels(
      calculatePercentage(expenseData[1].value, totalExpense)
    ),
    top: "68%",
    left: "28%",
  },
  {
    percentage: calculatePercentage(expenseData[2].value, totalExpense),
    color: "#fb923c",
    category: "Other",
    size: calculatePixels(
      calculatePercentage(expenseData[2].value, totalExpense)
    ),
    top: "62%",
    left: "72%",
  },
];

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
  return (
    <div className="bg-backgroundGray min-w-72 max-h-80 p-6 m-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-base font-normal text-gray-400 ">Expenses</h2>
      <div className="relative h-56 mb-2">
        {expensesData.map((item, index) => (
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
        ))}
      </div>
      <div className="flex justify-start space-x-6">
        {expensesData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600 font-medium">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
