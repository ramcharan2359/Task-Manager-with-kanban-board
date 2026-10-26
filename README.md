# Task Manager with Kanban Board

A full-stack Task Management application featuring a visual Kanban board with drag-and-drop workflow simulation, status tracking (To Do, In Progress, Done), and MongoDB persistence.

---

## 🚀 Features

- **Kanban Board Layout**: Categorize tasks into **To Do**, **In Progress**, and **Done**.
- **Full CRUD Support**: Create new tasks with title & description, update status directly, and delete completed tasks.
- **RESTful API**: Node.js & Express backend with Mongoose ODM.
- **Modern Frontend**: React + Vite for lightning-fast frontend development and Hot Module Replacement (HMR).

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, Modern CSS
- **Backend**: Node.js, Express.js, Mongoose, CORS, Dotenv
- **Database**: MongoDB (Atlas or Local)

---

## 📁 Project Structure

```
Task_manager/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx         # Kanban board UI & API calls
│   │   ├── App.css         # Styling for board, columns, and cards
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend API
│   ├── server.js           # API routes & database connection
│   ├── task.js             # Mongoose Task schema
│   ├── test-db.js          # MongoDB connection test script
│   ├── .env.example        # Environment variable template
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/ramcharan2359/Task-Manager-with-kanban-board.git
cd Task-Manager-with-kanban-board
```

### 2. Configure Environment Variables
Inside the `server/` directory, create a `.env` file from `.env.example`:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 3. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will run on `http://localhost:5000`.

### 4. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task (`title`, `description`, `status`) |
| `PUT` | `/api/tasks/:id` | Update task details or status |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

---

## 📄 License
ISC
