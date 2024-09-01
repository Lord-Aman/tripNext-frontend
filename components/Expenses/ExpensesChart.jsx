"use client";

import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

const data = {
  datasets: [
    {
      label: "Transport",
      data: [{ x: 1, y: 1, r: 100 }],
      backgroundColor: "rgba(52, 211, 153, 0.6)",
    },
    {
      label: "Hotel",
      data: [{ x: 1.5, y: 1.5, r: 75 }],
      backgroundColor: "rgba(99, 102, 241, 0.6)",
    },
    {
      label: "Others",
      data: [{ x: 2, y: 2, r: 50 }],
      backgroundColor: "rgba(249, 115, 22, 0.6)",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Expenses",
      color: "#6B7280",
      font: {
        size: 18,
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    datalabels: {
      color: "#ffffff",
      font: {
        weight: "bold",
        size: 16,
      },
      formatter: (value, context) => {
        return `${context.dataset.data[0].r / 10}%`;
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

const ExpensesChart = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[400px] h-[300px]">
        <Bubble data={data} options={options} />
      </div>
      <div className="flex mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <span
            className="block w-4 h-4 rounded-full"
            style={{ backgroundColor: "rgba(52, 211, 153, 1)" }}
          />
          <span className="text-gray-700">Transport</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="block w-4 h-4 rounded-full"
            style={{ backgroundColor: "rgba(99, 102, 241, 1)" }}
          />
          <span className="text-gray-700">Hotel</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="block w-4 h-4 rounded-full"
            style={{ backgroundColor: "rgba(249, 115, 22, 1)" }}
          />
          <span className="text-gray-700">Other</span>
        </div>
      </div>
    </div>
  );
};

export default ExpensesChart;
