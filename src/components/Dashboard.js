import React from 'react';
import './Dashboard.css';
import { FaPlus } from 'react-icons/fa';

// Renamed from Home to Dashboard, but functionality is similar to a typical dashboard view.
const Dashboard = ({ tasks, onAddTask, onTaskClick }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && task.status !== 'Done').length;

  // Get upcoming deadlines (e.g., next 7 days)
  const upcomingDeadlines = tasks
    .filter(task => task.dueDate && task.status !== 'Done')
    .map(task => ({ ...task, dueDateObj: new Date(task.dueDate) }))
    .sort((a, b) => a.dueDateObj - b.dueDateObj)
    .slice(0, 5); // Show top 5 upcoming

  // Mock recent activity (could be based on task updates in a real app)
  const recentActivity = tasks
    .sort((a,b) => (b.id - a.id)) // Simplistic: newest tasks first
    .slice(0,5)
    .map(task => ({ 
        id: task.id, 
        title: task.title, 
        action: `Task "${task.title}" was recently ${task.id > (totalTasks - 3) ? 'added' : 'updated'}.`, // Mock action
        timestamp: new Date(Date.now() - Math.random() * 100000000).toLocaleTimeString()
    }));

  return (
    <div className="dashboard-container">
      {/* Header is now part of App.js, this is the content area */}
      {/* <div className="dashboard-header">
        <h2>Home</h2> 
        <button className="add-task-btn primary" onClick={() => onAddTask({ title: 'New Task', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0] })}>
          <FaPlus /> Add Task
        </button>
      </div> */}

      <div className="quick-stats">
        <div className="stat-card glass glass-hover">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-card glass glass-hover">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card glass glass-hover">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>
        <div className="stat-card glass glass-hover">
          <h3>High Priority</h3>
          <p>{highPriorityTasks}</p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        <div className="upcoming-deadlines glass">
          <h3>Upcoming Deadlines</h3>
          {upcomingDeadlines.length > 0 ? (
            <ul className="deadline-list">
              {upcomingDeadlines.map(task => (
                <li key={task.id} className="deadline-item">
                  <span className="task-title" onClick={() => onTaskClick(task)}>{task.title}</span>
                  <span className={`due-date priority-${task.priority}`}>
                    {new Date(task.dueDate).toLocaleDateString()} - {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming deadlines.</p>
          )}
        </div>

        <div className="recent-activity glass">
          <h3>Recent Activity</h3>
          {recentActivity.length > 0 ? (
            <ul className="activity-list">
              {recentActivity.map(activity => (
                <li key={activity.id} className="activity-item">
                  <span className="task-title" onClick={() => onTaskClick(tasks.find(t => t.id === activity.id))}>{activity.title}</span>
                  <span className="timestamp">{activity.timestamp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity.</p>
          )}
        </div>
      </div>

      {/* Placeholder for more complex charts or summaries */}
      {/* <div className="dashboard-charts">
        <div className="chart-placeholder glass">
          Task Completion Progress (Chart)
        </div>
        <div className="chart-placeholder glass">
          Task Priority Distribution (Chart)
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
