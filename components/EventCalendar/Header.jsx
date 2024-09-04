import { Plus } from "lucide-react";

const Header = ({ openCreateModal }) => (
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Timeline</h1>
    <button
      onClick={openCreateModal}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center"
    >
      Add event
      <Plus className="ml-2 h-5 w-5" />
    </button>
  </header>
);

export default Header;
