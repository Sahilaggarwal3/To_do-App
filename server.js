const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "tasks.json");

function readTasks() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}

function writeTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// 🟢 Get all tasks
app.get("/tasks", (req, res) => res.json(readTasks()));

// 🟢 Add a new task (now includes priority)
app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
        dueDate: req.body.dueDate || null,
        priority: req.body.priority || "low", // ✅ Added this line
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.json(newTask);
});

// 🟡 Update completion status
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = req.body.completed;
    writeTasks(tasks);
    res.json(task);
});

// 🟠 Edit title, dueDate, or priority
app.patch("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (req.body.title) task.title = req.body.title;
    if (req.body.dueDate) task.dueDate = req.body.dueDate;
    if (req.body.priority) task.priority = req.body.priority; // ✅ Added this

    writeTasks(tasks);
    res.json(task);
});

// 🔴 Delete task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readTasks().filter(t => t.id !== id);
    writeTasks(tasks);
    res.json({ message: "Deleted" });
});

// 🚀 Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
