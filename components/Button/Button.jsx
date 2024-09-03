import React from "react";

export default function Button({ text, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full mb-8 flex items-center justify-center ${className}`}
    >
      <span>{text}</span>
      <span className="ml-2 text-xl">+</span>
    </button>
  );
}
