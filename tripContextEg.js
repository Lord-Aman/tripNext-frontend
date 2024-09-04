import { useTripContext } from "@/context/TripContext";

const TripDashboard = () => {
  const { tripsData, eventsData, todosData } = useTripContext();
  const { trips, createTrip, updateTrip, deleteTrip } = tripsData;
  const { events, createEvent, updateEvent, deleteEvent } = eventsData;
  const { todos, createTodo, updateTodo, deleteTodo } = todosData;

  return (
    <div>
      <h1>Trips</h1>
      {trips.map((trip) => (
        <div key={trip.id}>{trip.name}</div>
      ))}

      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}

      <h1>Todos</h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.taskName}</div>
      ))}
    </div>
  );
};

export default TripDashboard;
