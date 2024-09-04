import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  events,
}) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const hasEventOnDate = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events.some(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const today = new Date(); // Get today's date
  const isToday = (day) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const isSelected = (day) =>
    day === selectedDate.getDate() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getFullYear() === selectedDate.getFullYear();

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth}>
            <ChevronLeft className="h-6 w-6 text-gray-400" />
          </button>
          <button onClick={nextMonth}>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-gray-400 text-sm">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`
                h-8 w-8 flex items-center justify-center rounded-full text-sm relative cursor-pointer
                ${isToday(day) ? "bg-blue-500 shadow-lg text-white" : ""}
                ${isSelected(day) && !isToday(day) ? "bg-gray-300" : ""}
                ${day ? "text-gray-700" : "text-gray-300"}
              `}
          >
            {day}
            {day && hasEventOnDate(day) && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
