"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo/logo";
import MenuItem from "@/components/MenuItem/MenuItem";
import {
  Home,
  Calendar,
  Plane,
  Bed,
  Car,
  Landmark,
  HelpCircle,
  X,
} from "lucide-react";
import Button from "@/components/Button/Button";
import WeatherCard from "../Weather/WeatherCard";
import NewTripModal from "../NewTripModal/NewTripModal";

export default function Sidebar({ isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Calendar size={20} />, label: "All trips", href: "/alltrips" },
    { icon: <Plane size={20} />, label: "Travels", href: "#" },
    { icon: <Bed size={20} />, label: "Rooms", href: "#" },
    { icon: <Car size={20} />, label: "Transport", href: "#" },
    { icon: <Landmark size={20} />, label: "Attractions", href: "#" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 m-2 rounded-md flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <Logo />
        <button className="md:hidden" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <Button
        className="bg-customBlue h-12 text-white rounded-lg shadow-custom"
        text="New Trip"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </nav>
      <WeatherCard location="rome" />
      <MenuItem
        className="p-12"
        icon={<HelpCircle size={20} />}
        label="Support"
        href="/support"
      />
      <NewTripModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
