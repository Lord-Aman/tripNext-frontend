"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addTodo = async (taskName) => {
  try {
    const newTodo = {
      taskName,
      assignee: "Default",
      priority: "Low",
      createdAt: new Date().toISOString(),
    };
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error.message);
    return { error: error.message };
  }
};

export const updateTodo = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update todo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error.message);
    return { error: error.message };
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error.message);
    return { error: error.message };
  }
};

export const reorderTodos = async (newOrder) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos: newOrder }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reorder todos: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error reordering todos:", error.message);
    return { error: error.message };
  }
};
