import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-semibold">Welcome to Cleartripp</h1>
        {/* Add your main content here */}
      </main>
    </div>
  );
}
