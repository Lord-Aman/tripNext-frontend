'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`grid grid-cols-6 gap-4 items-center p-4 bg-white rounded-lg shadow mb-2 ${
            snapshot.isDragging ? 'bg-blue-50' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="col-span-1 text-gray-500"># {index + 1}</span>
          <div className="col-span-2 flex items-center">
            <input type="checkbox" 
            className="appearance-none w-4 mr-421 h-4 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none" />
            <span>{todo.taskName}</span>
          </div>
          <div className="col-span-1 flex items-center">
            <img
              src={todo.assigneeAvatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
              alt={todo.assignee}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{todo.assignee}</span>
          </div>
          <span
            className={`col-span-1 px-2 py-1 rounded text-white text-center ${getPriorityClass(
              todo.priority
            )}`}
          >
            {todo.priority}
          </span>
          <div className="col-span-1 flex items-center justify-end space-x-2">
            <FaEdit
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => onEdit(todo)}
            />
            <FaTrash
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => onDelete(todo._id)}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500';
    case 'Medium':
      return 'bg-orange-400';
    case 'Low':
      return 'bg-green-400';
    default:
      return 'bg-gray-400';
  }
};

export default TodoItem;
