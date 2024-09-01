'use client';

import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd(taskName);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white rounded-lg shadow mt-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add new task"
        className="flex-1 p-2 border border-gray-300 rounded mr-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default AddTodo;
