"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import Logo from "@/public/icons/Logo.svg";

const phrases = [
  "Plan your best trip",
  "Roam around the world",
  "Have joy with your friends",
  "Create lasting memories",
  "Explore new horizons",
];

export default function Login() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (letterIndex < currentPhrase.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + currentPhrase[letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, 50); // Adjust speed here

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setDisplayedText("");
        setLetterIndex(0);
      }, 1000); // Wait before showing next phrase

      return () => clearTimeout(timer);
    }
  }, [currentPhraseIndex, letterIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex items-center mb-8">
        <Image
          src={Logo}
          alt="Cleartripp Logo"
          width={50}
          height={50}
          className="w-12 h-12 mr-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">Cleartripp</h1>
      </div>

      <div className="text-center mb-8">
        <p className="text-2xl md:text-3xl font-semibold text-blue-600 h-16">
          {displayedText}
        </p>
      </div>

      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg",
          },
        }}
      />
    </div>
  );
}
