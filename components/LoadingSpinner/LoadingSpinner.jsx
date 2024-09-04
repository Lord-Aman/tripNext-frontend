import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
}
