"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ClientWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-grow p-2 bg-backgroundGray">{children}</main>
      </div>
    </div>
  );
}
