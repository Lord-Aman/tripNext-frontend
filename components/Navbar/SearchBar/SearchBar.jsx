import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative flex items-center w-full max-w-3xl">
      <input
        type="text"
        placeholder="Search"
        className="w-full py-2 pl-4 pr-10 text-gray-500 bg-backgroundGray focus:outline-none focus:border-gray-400 transition-colors"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 justify-end">
        <Search className="w-5 h-5 text-gray-700"  />
      </div>
    </div>
  )
}