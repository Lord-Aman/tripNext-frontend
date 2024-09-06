import { MoreVertical, Plane, Bus, Home } from "lucide-react";

const TimelineView = ({ events, openEditModal, currentTime, timelineRef }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event) => {
    const startMinutes =
      parseInt(event.startTime.split(":")[0]) * 60 +
      parseInt(event.startTime.split(":")[1]);
    const endMinutes =
      parseInt(event.endTime.split(":")[0]) * 60 +
      parseInt(event.endTime.split(":")[1]);
    const top = startMinutes * 2; // 2px per minute
    const height = (endMinutes - startMinutes) * 2;

    return {
      position: "absolute",
      top: `${top}px`,
      height: `${height}px`,
      left: "60px",
      right: "0",
    };
  };

  const getCurrentTimePosition = () => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return minutes * 2; // 2px per minute
  };

  return (
    <div className="relative  h-[60vh] overflow-y-auto" ref={timelineRef}>
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "2880px" }}
      >
        {" "}
        {/* 24 hours * 60 minutes * 2px */}
        {hours.map((hour) => (
          <div
            key={hour}
            className="flex items-center"
            style={{ height: "120px" }}
          >
            {" "}
            {/* 60 minutes * 2px */}
            <span className="w-12 text-xs text-gray-400">
              {hour.toString().padStart(2, "0")}:00
            </span>
            <div className="flex-1 border-t border-gray-200 ml-2"></div>
          </div>
        ))}
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => openEditModal(event)}
            className={`rounded-lg p-3 mb-4 cursor-pointer absolute left-14 right-0 ${
              event.type === "flight"
                ? "bg-blue-100"
                : event.type === "bus"
                ? "bg-green-100"
                : "bg-orange-100"
            }`}
            style={getEventStyle(event)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {event.type === "flight" && (
                  <Plane className="h-5 w-5 text-blue-500 mr-2" />
                )}
                {event.type === "bus" && (
                  <Bus className="h-5 w-5 text-green-500 mr-2" />
                )}
                {event.type === "hotel" && (
                  <Home className="h-5 w-5 text-orange-500 mr-2" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      event.type === "flight"
                        ? "text-blue-500"
                        : event.type === "bus"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.startTime} • {event.endTime}
                  </p>
                </div>
              </div>
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
        <div
          className="absolute left-0 right-0 h-0.5 bg-blue-500 z-10"
          style={{ top: `${getCurrentTimePosition()}px` }}
        ></div>
        <div
          className="absolute left-0 w-12 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs z-20"
          style={{ top: `${getCurrentTimePosition() - 12}px` }}
        >
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
