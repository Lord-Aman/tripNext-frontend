// Card Component
import { MoreVertical } from "lucide-react";

const Card = ({ title, content, onEdit }) => (
  <div className="bg-white p-6 flex flex-col justify-between max-h-44 rounded-lg lg:min-w-64 shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      <button onClick={onEdit} className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={20} />
      </button>
    </div>
    <div className="flex items-center flex-grow">
      <div className="flex-1">{content}</div>
    </div>
  </div>
);

export default Card;
