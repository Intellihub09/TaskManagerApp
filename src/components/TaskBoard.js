import React, { useState } from 'react';
import './TaskBoard.css';
import { FaPlus, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';

const TaskCard = ({ task, onTaskClick, onDragStart }) => {
  return (
    <div 
      className={`task-card glass-hover priority-${task.priority}`}
      onClick={() => onTaskClick(task)}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-card-header">
        <h4 className="task-card-title">{task.title}</h4>
        <span className={`task-card-priority priority-${task.priority}`}>{task.priority}</span>
      </div>
      <p className="task-card-description">{task.description || 'No description provided.'}</p>
      <div className="task-card-footer">
        {task.dueDate && (
          <span className="task-card-due-date">
            <FaCalendarAlt className="icon" /> {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.assignee && (
          <span className="task-card-assignee" title={`Assigned to ${task.assignee.name || 'N/A'}`}>
            {task.assignee.avatar ? 
              <img src={task.assignee.avatar} alt={task.assignee.name} /> : 
              <FaUserCircle className="icon" />
            }
          </span>
        )}
      </div>
      {task.tags && task.tags.length > 0 && (
        <div className="task-card-tags">
          {task.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      )}
    </div>
  );
};

const TaskColumn = ({ title, status, tasks, onTaskClick, onDragStart, onDrop, onDragOver }) => {
  const columnTasks = tasks.filter(task => task.status === status);
  
  return (
    <div 
      className="task-column"
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
    >
      <div className="task-column-header">
        <h3>{title}</h3>
        <span className="task-count">{columnTasks.length}</span>
      </div>
      <div className="task-list">
        {columnTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onTaskClick={onTaskClick} 
            onDragStart={onDragStart}
          />
        ))}
        {columnTasks.length === 0 && <p className="no-tasks-message">No tasks here.</p>}
      </div>
    </div>
  );
};

const TaskBoard = ({ tasks, onTaskClick, onAddTask, onUpdateTaskStatus }) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const taskStatuses = [
    { id: 'Backlog', title: 'Backlog' },
    { id: 'To Do', title: 'To Do' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'QA', title: 'QA / Review' },
    { id: 'Done', title: 'Done' },
  ];

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Optionally, set drag image or data
    // e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTaskId) {
      onUpdateTaskStatus(draggedTaskId, newStatus);
      setDraggedTaskId(null);
    }
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  return (
    <div className="task-board-container">
      {/* <div className="task-board-header">
        <h2>Task Board</h2>
        <button className="add-task-btn primary" onClick={() => onAddTask({ title: 'New Task from Board', status: 'Backlog', priority: 'Medium' })}>
          <FaPlus /> Add Task
        </button>
      </div> */}
      <div className="task-board-columns">
        {taskStatuses.map(statusInfo => (
          <TaskColumn
            key={statusInfo.id}
            title={statusInfo.title}
            status={statusInfo.id}
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver} // Add this to each column
            onDragLeave={handleDragLeave} // Optional: remove highlight when not over droppable area
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
