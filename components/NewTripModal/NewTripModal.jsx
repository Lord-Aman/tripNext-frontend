"use client";

import React, { useState } from "react";
import { X, Plus, User } from "lucide-react";

const ExpenseTypeSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  >
    <option value="transport">Transport</option>
    <option value="hotel">Hotel</option>
    <option value="other">Other</option>
  </select>
);

export default function NewTripModal({ isModalOpen }) {
  const [tripData, setTripData] = useState({
    name: "",
    sourceCountry: "",
    destinationCountry: "",
    startDate: "",
    endDate: "",
    participants: [],
    expenses: [{ type: "transport", amount: 0 }],
  });

  const handleInputChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const addParticipant = () => {
    setTripData({
      ...tripData,
      participants: [...tripData.participants, { id: Date.now(), name: "" }],
    });
  };

  const updateParticipant = (id, name) => {
    setTripData({
      ...tripData,
      participants: tripData.participants.map((p) =>
        p.id === id ? { ...p, name } : p
      ),
    });
  };

  const removeParticipant = (id) => {
    setTripData({
      ...tripData,
      participants: tripData.participants.filter((p) => p.id !== id),
    });
  };

  const addExpense = () => {
    setTripData({
      ...tripData,
      expenses: [...tripData.expenses, { type: "transport", amount: 0 }],
    });
  };

  const updateExpense = (index, field, value) => {
    const newExpenses = [...tripData.expenses];
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    setTripData({ ...tripData, expenses: newExpenses });
  };

  const removeExpense = (index) => {
    setTripData({
      ...tripData,
      expenses: tripData.expenses.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Trip Data:", tripData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">New Trip</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trip Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tripData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Source Country
                  </label>
                  <input
                    type="text"
                    name="sourceCountry"
                    value={tripData.sourceCountry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    name="destinationCountry"
                    value={tripData.destinationCountry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={tripData.startDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={tripData.endDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Participants
                  </label>
                  {tripData.participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <User size={24} className="text-gray-400" />
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) =>
                          updateParticipant(participant.id, e.target.value)
                        }
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder={`Participant ${index + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeParticipant(participant.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus size={20} className="mr-1" /> Add Participant
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expenses
                  </label>
                  {tripData.expenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <ExpenseTypeSelect
                        value={expense.type}
                        onChange={(value) =>
                          updateExpense(index, "type", value)
                        }
                      />
                      <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) =>
                          updateExpense(
                            index,
                            "amount",
                            parseFloat(e.target.value)
                          )
                        }
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Amount"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeExpense(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExpense}
                    className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus size={20} className="mr-1" /> Add Expense
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
