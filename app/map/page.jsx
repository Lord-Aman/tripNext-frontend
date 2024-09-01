import LocationMap from "@/components/LocationMap/LocationMap";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <LocationMap center={[41.9028, 12.4964]} zoom={12} />
    </div>
  );
}
