import React from 'react';
import './Placeholder.css'; // Using Placeholder CSS for now

const Analytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const backlogTasks = tasks.filter(task => task.status === 'Backlog').length;
  const qaTasks = tasks.filter(task => task.status === 'QA').length;

  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  // Basic data for charts (can be expanded with a charting library)
  const taskStatusData = [
    { name: 'Backlog', value: backlogTasks },
    { name: 'In Progress', value: inProgressTasks },
    { name: 'QA', value: qaTasks },
    { name: 'Done', value: completedTasks },
  ];

  // This is a placeholder for where charts would be rendered.
  // You'd typically use a library like Recharts, Chart.js, or Nivo here.
  const renderChartPlaceholder = (title, data) => (
    <div className="analytics-chart-placeholder glass">
      <h3 className="neon-accent">{title}</h3>
      <ul>
        {data.map(item => (
          <li key={item.name}>{item.name}: {item.value}</li>
        ))}
      </ul>
      {title === "Task Completion Rate" && <p>Rate: {completionRate}%</p>}
    </div>
  );

  return (
    <div className="placeholder-container analytics-container">
      <h2 className="neon-accent">Project Analytics</h2>
      <div className="analytics-summary">
        <div className="summary-card glass glass-hover">
          <h4>Total Tasks</h4>
          <p className="neon-accent">{totalTasks}</p>
        </div>
        <div className="summary-card glass glass-hover">
          <h4>Completed</h4>
          <p className="neon-accent">{completedTasks}</p>
        </div>
        <div className="summary-card glass glass-hover">
          <h4>In Progress</h4>
          <p className="neon-accent">{inProgressTasks}</p>
        </div>
        <div className="summary-card glass glass-hover">
          <h4>Completion Rate</h4>
          <p className="neon-accent">{completionRate}%</p>
        </div>
      </div>
      
      <div className="analytics-charts-grid">
        {renderChartPlaceholder("Task Status Distribution", taskStatusData)}
        {/* Add more chart placeholders as needed */}
        {/* e.g., tasks by priority, tasks completed over time, etc. */}
      </div>

      <style jsx>{`
        .analytics-container {
          padding: 20px;
        }
        .analytics-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .summary-card {
          padding: 20px;
          text-align: center;
        }
        .summary-card h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #b0b0d0;
        }
        .summary-card p {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0;
        }
        .analytics-charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .analytics-chart-placeholder {
          padding: 20px;
        }
        .analytics-chart-placeholder h3 {
          text-align: center;
          margin-top: 0;
          margin-bottom: 15px;
        }
        .analytics-chart-placeholder ul {
          list-style: none;
          padding: 0;
        }
        .analytics-chart-placeholder li {
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .analytics-chart-placeholder li:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default Analytics;
