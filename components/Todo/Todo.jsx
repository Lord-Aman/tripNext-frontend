"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ArrowUpDown, Pencil, Trash2, GripVertical } from "lucide-react";
import Image from "next/image";
import UserAvatar from "@/public/icons/avatar.svg";

const initialTasks = [
  {
    id: "1",
    taskName: "Elit est nibh cras phasellus scelerisque orci",
    assignee: "Artur",
    priority: "Medium",
    completed: false,
  },
  {
    id: "2",
    taskName: "Urna nibh eget facilisis egestas mi",
    assignee: "Jane",
    priority: "Low",
    completed: false,
  },
  {
    id: "3",
    taskName: "Enim tincidunt orci curabitur habitant.",
    assignee: "Artur",
    priority: "Medium",
    completed: false,
  },
  {
    id: "4",
    taskName: "Sed condimentum magnis dui bibendum",
    assignee: "Marta",
    priority: "High",
    completed: false,
  },
];

const priorityColors = {
  Low: "bg-gray-200 text-gray-700",
  Medium: "bg-orange-200 text-orange-700",
  High: "bg-red-200 text-red-700",
};

function TodoItem({ task, index, onComplete, onEdit, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group grid grid-cols-12 gap-4 items-center py-3 border-b last:border-b-0 transition-colors duration-200 ${
            snapshot.isDragging ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          <div className="col-span-1 flex items-center">
            <div
              {...provided.dragHandleProps}
              className="mr-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <GripVertical size={16} className="text-gray-400" />
            </div>
            <span className="text-gray-500">{index + 1}</span>
          </div>
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onComplete(task.id)}
              className="w-5 h-5 rounded-full border-gray-300 text-green-500 focus:ring-green-500"
            />
          </div>
          <div
            className={`col-span-5 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.taskName}
          </div>
          <div className="col-span-2 flex items-center">
            <img
              src={`https://randomuser.me/api/portraits/men/${index + 1}.jpg`}
              width={24}
              height={24}
              alt={task.assignee}
              className="rounded-full mr-2"
            />
            <span>{task.assignee}</span>
          </div>
          <div className="col-span-3 flex items-center justify-between">
            <span
              className={`inline-block px-2 py-1 rounded-full text-sm ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Pencil size={16} className="text-gray-500" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Trash2 size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

function EditTaskModal({ task, onSave, onClose }) {
  const [editingTask, setEditingTask] = useState(task);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editingTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={editingTask.taskName}
              onChange={(e) =>
                setEditingTask({ ...editingTask, taskName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({ ...editingTask, priority: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const handleComplete = (id) => {
    const updatedTasks = tasks
      .map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
      .sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      a.taskName.localeCompare(b.taskName)
    );
    setTasks(sortedTasks);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-backgroundGray rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">To do's</h1>
        <button
          onClick={handleSort}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          Sort <ArrowUpDown className="ml-1" />
        </button>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
        <div className="col-span-1">#</div>
        <div className="col-span-1"></div>
        <div className="col-span-5">Task name</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-3">Priority</div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks.id">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  index={index}
                  onComplete={handleComplete}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button className="w-full mt-4 py-3 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50 text-sm font-medium">
        Add new task +
      </button>

      {isModalOpen && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
