import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; // Renamed to Home
import TaskBoard from './components/TaskBoard';
import CalendarView from './components/CalendarView';
import NotesSection from './components/NotesSection';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import TaskDetailModal from './components/TaskDetailModal';
import UserProfileDropdown from './components/UserProfileDropdown';

// Mock initial tasks data
const initialTasks = [
  { id: 1, title: 'Design landing page mockups', description: 'Create 3 variations for the new landing page.', status: 'Backlog', priority: 'High', dueDate: '2024-08-15', subtasks: [{id: 101, title: 'Research competitors', completed: true}], attachments: ['brief.pdf'], comments: [{id:201, user:'Alice', text:'Great start!', timestamp: '2024-07-20T10:00:00Z'}] },
  { id: 2, title: 'Develop API for user authentication', description: 'Implement JWT-based auth.', status: 'In Progress', priority: 'Critical', dueDate: '2024-08-01' },
  { id: 3, title: 'Write blog post about Q2 achievements', description: 'Summarize key metrics and successes.', status: 'QA', priority: 'Medium', dueDate: '2024-07-28' }, // Renamed from Review
  { id: 4, title: 'Test payment gateway integration', description: 'Ensure Stripe payments work end-to-end.', status: 'Done', priority: 'High', dueDate: '2024-07-10' },
  { id: 5, title: 'Plan team retreat for Q4', description: 'Location scouting and budget planning.', status: 'Backlog', priority: 'Low', dueDate: '2024-09-30' },
];

function App() {
  const [activeView, setActiveView] = useState('Home'); // Default view is Home (Dashboard)
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [themeColor, setThemeColor] = useState('#00FFAA'); // Default theme color

  useEffect(() => {
    document.documentElement.style.setProperty('--neon-accent-color', themeColor);
  }, [themeColor]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  const handleAddTask = (newTaskDetails) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...newTaskDetails,
      status: 'Backlog', // Default status for new tasks
      // Ensure other necessary fields like description, subtasks, etc., are initialized if not provided
      description: newTaskDetails.description || '',
      subtasks: newTaskDetails.subtasks || [],
      attachments: newTaskDetails.attachments || [],
      comments: newTaskDetails.comments || [],
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const renderView = () => {
    switch (activeView) {
      case 'Home': // Renamed from Dashboard
        return <Dashboard tasks={tasks} onAddTask={handleAddTask} onTaskClick={handleTaskClick} />;
      case 'Tasks':
        return <TaskBoard tasks={tasks} onTaskStatusChange={handleTaskStatusChange} onTaskClick={handleTaskClick} />;
      case 'Calendar':
        return <CalendarView tasks={tasks} onTaskClick={handleTaskClick} />;
      case 'Notes':
        return <NotesSection />;
      case 'Analytics':
        return <Analytics tasks={tasks} />;
      case 'Settings':
        return <Settings currentThemeColor={themeColor} onThemeColorChange={setThemeColor} />;
      default:
        return <Dashboard tasks={tasks} onAddTask={handleAddTask} onTaskClick={handleTaskClick} />; // Fallback to Home
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className={`main-content ${document.querySelector('.sidebar.collapsed') ? 'sidebar-collapsed' : ''}`}>
        <header className="app-header glass">
          <h1>{activeView}</h1>
          <UserProfileDropdown />
        </header>
        <div className="content-area">
          {renderView()}
        </div>
      </main>
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={handleCloseModal} 
          onSave={handleSaveTask} 
        />
      )}
    </div>
  );
}

export default App;
