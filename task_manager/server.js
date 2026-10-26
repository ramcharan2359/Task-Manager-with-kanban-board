
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const Task = require("./task");

const app = express();

app.use(cors());
app.use(express.json());

// Test the server or serve static client
const clientDistPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
} else {
    app.get("/", (req, res) => {
        res.send("Task Manager Backend is Running!");
    });
}

// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message
        });
    }
});
// Add a new task
app.post("/api/tasks", async (req, res) => {
    try {
        if (!req.body.title || !req.body.title.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const task = await Task.create({
            title: req.body.title.trim(),
            description: req.body.description || "",
            status: req.body.status || "To Do"
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: "Error creating task" });
    }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "Error updating task" });
    }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting task" });
    }
});

// If frontend is built, serve index.html for any non-API GET routes (Express 5 compatible)
if (fs.existsSync(clientDistPath)) {
    app.use((req, res, next) => {
        if (req.method === "GET" && !req.path.startsWith("/api")) {
            return res.sendFile(path.join(clientDistPath, "index.html"));
        }
        next();
    });
}

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
