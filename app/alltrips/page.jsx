import { PlusCircle } from "lucide-react";

// Function to calculate trip duration
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return duration;
};

// Dummy data for trips
const trips = [
  {
    id: 1,
    name: "Mediterranean Adventure",
    source: "Spain",
    destination: "Italy",
    startDate: "2023-06-01",
    endDate: "2023-06-12",
    color: "bg-blue-400",
  },
  {
    id: 2,
    name: "Nordic Expedition",
    source: "Sweden",
    destination: "Norway",
    startDate: "2023-08-10",
    endDate: "2023-08-20",
    color: "bg-green-400",
  },
  {
    id: 3,
    name: "Balkan Discovery",
    source: "Croatia",
    destination: "Greece",
    startDate: "2023-09-05",
    endDate: "2023-09-18",
    color: "bg-yellow-400",
  },
  {
    id: 4,
    name: "Alpine Retreat",
    source: "Switzerland",
    destination: "Austria",
    startDate: "2023-10-01",
    endDate: "2023-10-10",
    color: "bg-purple-400",
  },
];

export default function TripList() {
  return (
    <div className="min-h-screen bg-backgroundGray">
      {/* Heading */}
      <div className="container px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          All Trips
        </h1>
      </div>

      {/* Trip list */}
      <div className="container mx-auto px-4 py-12">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className={`relative overflow-hidden rounded-xl shadow-lg h-64 ${trip.color}`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-white text-sm mb-1">
                      {calculateDuration(trip.startDate, trip.endDate)} days,{" "}
                      {calculateDuration(trip.startDate, trip.endDate) - 1}{" "}
                      nights
                    </p>
                    <h2 className="text-white text-2xl font-bold mb-2">
                      {trip.source} → {trip.destination}
                    </h2>
                    <p className="text-white text-sm">
                      {new Date(trip.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(trip.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button className="bg-white text-black py-2 px-4 rounded-full text-sm font-semibold hover:bg-opacity-90 transition duration-300">
                    View trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-8">
              Enjoy moments by planning a trip.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg inline-flex items-center transition duration-300 transform hover:scale-105">
              <PlusCircle className="mr-2" size={24} />
              Add Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
