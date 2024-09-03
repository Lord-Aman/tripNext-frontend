"use client";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { Sora } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import Login from "@/components/Login/Login";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sora.className}>
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            <div className="flex h-screen">
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
              <div className="flex flex-col flex-grow">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-grow p-2 bg-backgroundGray">
                  {children}
                </main>
              </div>
            </div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
