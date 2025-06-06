import React, { useState, useEffect } from 'react';
import './CalendarView.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarView = ({ tasks, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate, tasks]); // Re-generate if tasks change too, to update task display

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    
    const daysArray = [];

    // Days from previous month
    const prevMonthDaysCount = firstDayOfMonth;
    const prevMonth = new Date(year, month, 0);
    const prevMonthTotalDays = prevMonth.getDate();
    for (let i = 0; i < prevMonthDaysCount; i++) {
      daysArray.push({
        day: prevMonthTotalDays - prevMonthDaysCount + i + 1,
        month: 'prev',
        dateObj: new Date(year, month - 1, prevMonthTotalDays - prevMonthDaysCount + i + 1)
      });
    }

    // Days in current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push({
        day: i,
        month: 'current',
        dateObj: new Date(year, month, i)
      });
    }

    // Days from next month
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDaysCount = totalCells - daysArray.length;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      daysArray.push({
        day: i,
        month: 'next',
        dateObj: new Date(year, month + 1, i)
      });
    }
    setDaysInMonth(daysArray);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getTasksForDay = (dateObj) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getFullYear() === dateObj.getFullYear() &&
             taskDate.getMonth() === dateObj.getMonth() &&
             taskDate.getDate() === dateObj.getDate();
    });
  };

  const isToday = (dateObj) => {
    const today = new Date();
    return dateObj.getFullYear() === today.getFullYear() &&
           dateObj.getMonth() === today.getMonth() &&
           dateObj.getDate() === today.getDate();
  };

  return (
    <div className="calendar-view-container glass">
      <div className="calendar-header glass-hover">
        <button onClick={handlePrevMonth} aria-label="Previous Month"><FaChevronLeft /></button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth} aria-label="Next Month"><FaChevronRight /></button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {daysInMonth.map((dayInfo, index) => {
          const dailyTasks = dayInfo.month === 'current' ? getTasksForDay(dayInfo.dateObj) : [];
          return (
            <div 
              key={`${dayInfo.month}-${dayInfo.day}-${index}`} 
              className={`calendar-day 
                ${dayInfo.month !== 'current' ? 'other-month' : ''}
                ${dayInfo.month === 'current' && isToday(dayInfo.dateObj) ? 'today' : ''}
              `}
            >
              <span>{dayInfo.day}</span>
              <div className="calendar-tasks">
                {dailyTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`calendar-task-item priority-${task.priority}`}
                    onClick={() => onTaskClick(task)}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
