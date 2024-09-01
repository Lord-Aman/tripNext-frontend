'use client';

import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDragEnd, onEdit, onDelete }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-gray-500 bg-gray-50">
          <span className="col-span-1 text-left">#</span>
          <span className="col-span-2 text-left">Task name</span>
          <span className="col-span-1 text-left">Assignee</span>
          <span className="col-span-1 text-left">Priority</span>
          <span className="col-span-1 text-left"></span> {/* Empty column for actions */}
        </div>

        <Droppable droppableId="todos._id">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-2 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
            >
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
