import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">Loading Trips</h2>
        <p className="mt-2 text-gray-500">
          Please wait while we fetch your adventures...
        </p>
      </div>
    </div>
  );
}
