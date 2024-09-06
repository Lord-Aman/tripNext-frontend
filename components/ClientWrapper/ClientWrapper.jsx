"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SnackbarProvider } from "notistack";
import ScaledLayout from "../ScaledLayout/ScaledLayout";

export default function ClientWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <div className="flex h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <ScaledLayout>
          <div className="flex flex-col flex-grow">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="flex-grow p-2 bg-backgroundGray">{children}</main>
          </div>
        </ScaledLayout>
      </div>
    </SnackbarProvider>
  );
}
