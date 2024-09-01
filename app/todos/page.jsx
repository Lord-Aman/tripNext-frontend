'use client';

import React, { useState, useEffect } from 'react';
import TodoList from '@/components/Todos/TodoList';
import AddTodo from '@/components/Todos/AddTodo';
import SortButton from '@/components/Todos/SortButton';
import { addTodo, updateTodo, deleteTodo, reorderTodos } from '@/hooks/useTodos';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    };
    
    fetchTodos();
  }, []);

  const handleAddTodo = async (taskName) => {
    const newTodo = await addTodo(taskName);
    setTodos([...todos, newTodo]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    // Reorder the todos array based on the drag and drop result
    const reorderedTodos = [...todos];
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, reorderedItem);
  
    // Update the order key for each todo based on its new position
    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index + 1, // Order starts from 1
    }));
  
    // Update the backend with the new order
    reorderTodos(updatedTodos);
  
    // Update the frontend state with the updated todos
    setTodos(updatedTodos);
  
  };
  

  const handleEditTodo = (todo) => {
    // Implement the edit logic here, possibly opening a modal for editing
    console.log('Edit todo', todo);
  };

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(todoId);
    setTodos(todos.filter((todo) => todo._id !== todoId));
  };

  return (
    <div className="container mx-auto md:w-[766px] px-4">
      <h1 className="text-2xl font-bold font-sans mb-4">To do’s</h1>
      <SortButton onSort={() => {/* Sorting logic here */}} />
      <TodoList todos={todos} onDragEnd={handleDragEnd} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
      <AddTodo onAdd={handleAddTodo} />
    </div>
  );
};

export default Home;
