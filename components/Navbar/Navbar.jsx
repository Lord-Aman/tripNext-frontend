import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Notification from "./Notification/Notification";
import UserProfile from "./UserProfile/UserProfile";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo/logo";
import { UserButton } from "@clerk/nextjs";

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="flex flex-col bg-backgroundGray">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4 w-3/4">
          <button className="md:hidden" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <div className="md:hidden">
            <Logo />
          </div>
          <div className="hidden md:block">
            <DropdownMenu />
          </div>
          <div className="hidden md:block flex-grow">
            <SearchBar />
          </div>
        </div>
        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <div className="hidden md:flex items-center justify-center space-x-4 mr-4">
            <LanguageSelector />
            <Notification />
          </div>
          <UserButton />
          <UserProfile />
        </div>
      </div>
      <div className="flex px-6">
        <div className="w-[calc(75%-1rem)] border-b border-gray-200"></div>
        <div className="w-8"></div>
        <div className="flex-1 border-b border-gray-200"></div>
      </div>
    </nav>
  );
}
