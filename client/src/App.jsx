
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith("/api/tasks")
      ? import.meta.env.VITE_API_URL
      : `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/tasks`)
  : (import.meta.env.DEV ? "http://localhost:5000/api/tasks" : "/api/tasks");

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadTasks() {
    try {
      const response = await axios.get(API);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks:", error.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      await axios.post(API, { title, description });
      setTitle("");
      setDescription("");
      loadTasks();
    } catch (error) {
      alert("Could not add task. Check whether the backend is running.");
    }
  }

  async function changeStatus(task, status) {
    try {
      await axios.put(`${API}/${task._id}`, { status });
      loadTasks();
    } catch (error) {
      alert("Could not update task.");
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${API}/${id}`);
      loadTasks();
    } catch (error) {
      alert("Could not delete task.");
    }
  }

  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p>A simple Kanban board for student tasks</p>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <h2>Create a Task</h2>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Enter description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <main className="board">
        {statuses.map((status) => (
          <section className="column" key={status}>
            <h2>
              {status}
              <span>
                {tasks.filter((task) => task.status === status).length}
              </span>
            </h2>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <article className="task-card" key={task._id}>
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description"}</p>

                  <label>Task status</label>
                  <select
                    value={task.status}
                    onChange={(event) =>
                      changeStatus(task, event.target.value)
                    }
                  >
                    {statuses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete Task
                  </button>
                </article>
              ))}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
