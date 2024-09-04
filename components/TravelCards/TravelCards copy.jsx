"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Plus, ArrowLeftRight, Plane } from "lucide-react";
import Image from "next/image";
import UserAvatar from "@/public/icons/avatar.svg";

// Card Component
const Card = ({ title, content, icon, onEdit }) => (
  <div className="bg-white p-6 flex flex-col justify-between max-h-44 rounded-lg lg:min-w-72 shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      <button onClick={onEdit} className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={20} />
      </button>
    </div>
    <div className="flex items-center flex-grow">
      <div className="flex-1">{content}</div>
    </div>
  </div>
);

// EditModal Component
const EditModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const getFlagUrl = (countryCode) => {
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
};

const getCountryCode = async (countryName) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    return data[0]?.cca2.toLowerCase() || "in";
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "in";
  }
};

export default function TravelCards() {
  const [travelDate, setTravelDate] = useState({
    start: "2021-09-01",
    end: "2021-09-05",
  });
  const [people, setPeople] = useState([
    { name: "Marta", avatar: UserAvatar },
    { name: "Artur", avatar: UserAvatar },
  ]);
  const [destination, setDestination] = useState({
    from: "Poland",
    to: "Italy",
    duration: "2 h 25 min",
  });
  const [editingCard, setEditingCard] = useState(null);
  const [fromFlag, setFromFlag] = useState("in");
  const [toFlag, setToFlag] = useState("in");

  useEffect(() => {
    const fetchFlags = async () => {
      const fromCode = await getCountryCode(destination.from);
      const toCode = await getCountryCode(destination.to);
      setFromFlag(fromCode);
      setToFlag(toCode);
    };
    fetchFlags();
  }, [destination.from, destination.to]);

  const calculateDays = (start, end) => {
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleEdit = (cardType) => {
    setEditingCard(cardType);
  };

  const handleCloseModal = () => {
    setEditingCard(null);
  };

  const handleSave = (cardType, newData) => {
    switch (cardType) {
      case "travelDate":
        setTravelDate(newData);
        break;
      case "people":
        setPeople(newData);
        break;
      case "destination":
        setDestination(newData);
        break;
    }
    handleCloseModal();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
  };

  return (
    <div className="w-full p-4 pr-0 flex ">
      <div className="w-full p-4 gap-8 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <Card
            title="Travel date"
            content={
              <div>
                <div className="text-4xl font-bold leading-tight mb-2 w-full">
                  {calculateDays(travelDate.start, travelDate.end)} days
                </div>
                <div className="w-full mt-4 space-x-4 text-sm text-gray-500">
                  <span>{formatDate(travelDate.start)}</span>
                  <ArrowLeftRight className="inline" size={16} />{" "}
                  <span>{formatDate(travelDate.end)}</span>
                </div>
              </div>
            }
            onEdit={() => handleEdit("travelDate")}
          />

          {/* TODO: Add functionality to add people and show ... if there are more than two people */}
          <Card
            title="People"
            content={
              <div>
                <div className="text-4xl font-bold leading-tight mb-2">
                  {people.length}{" "}
                  <span className="text-lg font-normal">/adults</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {people.map((person, index) => (
                      <Image
                        key={index}
                        src={person.avatar}
                        alt={person.name}
                        className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
                      />
                    ))}
                    <div className="ml-2 text-sm text-gray-600">
                      {people.map((p) => p.name).join(", ")}
                    </div>
                  </div>
                  <button className="ml-2 bg-gray-200 rounded-full p-1">
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            }
            onEdit={() => handleEdit("people")}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          <Card
            title="Destination"
            content={
              <div className="">
                <div className="text-4xl font-bold leading-tight mb-4">
                  Rome
                </div>
                <div className="flex space-x-4 items-center justify-center text-sm text-gray-600">
                  <div className="space-x-2 flex items-center justify-center">
                    <img
                      src={getFlagUrl(fromFlag)}
                      alt={`${destination.from} flag`}
                      className="mr-2"
                    />
                    {destination.from}{" "}
                    <ArrowLeftRight className="mx-1" size={16} />
                  </div>
                  <div className="space-x-2 flex items-center justify-center">
                    <div className="flex mr-8">
                      <img
                        src={getFlagUrl(toFlag)}
                        alt={`${destination.to} flag`}
                        className="mr-4"
                      />
                      {destination.to}
                    </div>
                    <div className="flex space-x-4 items-center">
                      <Plane className="ml-2 mr-1" size={16} />
                      {destination.duration} flight
                    </div>
                  </div>
                </div>
              </div>
            }
            icon={
              <div className="bg-purple-100 p-2 rounded-full">
                <Plane size={24} className="text-purple-500" />
              </div>
            }
            onEdit={() => handleEdit("destination")}
          />
        </div>
      </div>
      <EditModal
        isOpen={editingCard === "travelDate"}
        onClose={handleCloseModal}
        title="Edit Travel Date"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSave("travelDate", {
              start: formData.get("start"),
              end: formData.get("end"),
            });
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="start"
              defaultValue={travelDate.start}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="end"
              defaultValue={travelDate.end}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </form>
      </EditModal>

      <EditModal
        isOpen={editingCard === "people"}
        onClose={handleCloseModal}
        title="Edit People"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newPeople = people.map((person, index) => ({
              ...person,
              name: formData.get(`name-${index}`),
            }));
            handleSave("people", newPeople);
          }}
        >
          {people.map((person, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Person {index + 1}
              </label>
              <input
                type="text"
                name={`name-${index}`}
                defaultValue={person.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </form>
      </EditModal>

      <EditModal
        isOpen={editingCard === "destination"}
        onClose={handleCloseModal}
        title="Edit Destination"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSave("destination", {
              from: formData.get("from"),
              to: formData.get("to"),
              duration: formData.get("duration"),
            });
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              From
            </label>
            <input
              type="text"
              name="from"
              defaultValue={destination.from}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              To
            </label>
            <input
              type="text"
              name="to"
              defaultValue={destination.to}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Flight Duration
            </label>
            <input
              type="text"
              name="duration"
              defaultValue={destination.duration}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </form>
      </EditModal>
    </div>
  );
}
