import { useState, useEffect } from "react";

const backend_endpoint = process.env.NEXT_PUBLIC_TRIPNEXT_BACKEND_ENDPOINT;

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodosByTripId = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/todos/trip/${tripId}`);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, todoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${backend_endpoint}/todos/${id}`, { method: "DELETE" });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reorderTodos = async (todosList) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backend_endpoint}/todos/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos: todosList }),
      });
      const updatedTodos = await response.json();
      setTodos(updatedTodos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodosByTripId,
    createTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
  };
};

export default useTodos;
