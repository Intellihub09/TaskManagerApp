# Task Manager App

This is a React-based Task Manager application designed to help users organize and track their tasks effectively.

## Features

*   **Dashboard:** Get a quick overview of your tasks, including total tasks, completed tasks, in-progress tasks, and high-priority items. View upcoming deadlines and recent activity.
*   **Task Board:** Visualize your workflow with a Kanban-style board. Drag and drop tasks between columns (Backlog, To Do, In Progress, QA, Done).
*   **Calendar View:** See your tasks with due dates laid out on a monthly calendar.
*   **Notes Section:** Create and manage personal notes. Notes support titles, content, and color-coding.
*   **Analytics:** View basic project analytics, such as task status distribution and completion rates.
*   **Settings:** Customize the application's theme accent color and toggle between light/dark modes.
*   **Task Details:** Click on any task to open a detailed modal view where you can edit its title, description, status, priority, due date, and assignee. Manage sub-tasks, attachments, and comments.
*   **Responsive Design:** The application is designed to work on various screen sizes.

## Tech Stack

*   React
*   JavaScript (ES6+)
*   HTML5
*   CSS3 (with a focus on Glassmorphism and Neon aesthetics)
*   React Icons

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Intellihub09/TaskManagerApp.git
    cd TaskManagerApp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your default web browser, usually at `http://localhost:3000`.

## Project Structure

```
TaskManagerApp/
├── public/
│   └── index.html      # Main HTML page
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Analytics.js
│   │   ├── CalendarView.js
│   │   ├── Dashboard.js
│   │   ├── NotesSection.js
│   │   ├── Settings.js
│   │   ├── Sidebar.js
│   │   ├── TaskBoard.js
│   │   ├── TaskDetailModal.js
│   │   └── UserProfileDropdown.js
│   ├── App.css           # Main app styles
│   ├── App.js            # Main application component
│   ├── index.css         # Global styles
│   └── index.js          # Entry point of the React application
├── .gitignore
├── package-lock.json
├── package.json
└── README.md           # This file
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
