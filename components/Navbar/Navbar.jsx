import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import LanguageSelector from './LanguageSelector/LanguageSelector'
import Notification from './Notification/Notification'
import UserProfile from './UserProfile/UserProfile'
import DropdownMenu from './DropdownMenu/DropdownMenu'

export default function Navbar() {
  return (
    <nav className="flex flex-col bg-backgroundGray">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4 w-3/4">
          <DropdownMenu />
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4 w-1/4 justify-end">
        <div className='flex items-center justify-center space-x-4 mr-4'>
          <LanguageSelector />
          <Notification />
          </div>
          <UserProfile />
        </div>
      </div>
      <div className="flex px-6">
        <div className="w-[calc(75%-1rem)] border-b border-gray-200"></div>
        <div className="w-8"></div>
        <div className="flex-1 border-b border-gray-200"></div>
      </div>
    </nav>
  )
}