import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function DropdownMenu() {
  return (
    <div className="relative">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
        <span>Travels</span>
        <ChevronDown size={16} />
      </button>
    </div>
  )
}