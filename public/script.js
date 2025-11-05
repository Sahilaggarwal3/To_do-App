const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");

async function loadTasks() {
    try {
        const res = await fetch("/tasks");
        if (!res.ok) throw new Error("Server error");
        const tasks = await res.json();
        renderTasks(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        renderTasks(tasks);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = "";
    const filtered = tasks.filter(t =>
        t.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    filtered.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.classList.add(task.priority || "low");
    if (task.completed) li.classList.add("completed");

    const content = document.createElement("div");
    content.style.flex = "1";

    const title = document.createElement("span");
    title.textContent = task.title;
    title.addEventListener("click", async () => {
        await fetch(`/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !task.completed }),
        });
        loadTasks();
    });

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = task.dueDate
        ? `Due: ${task.dueDate} | Priority: ${task.priority}`
        : `Priority: ${task.priority}`;

    content.append(title, meta);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => editTask(task));

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await fetch(`/tasks/${task.id}`, { method: "DELETE" });
        loadTasks();
    });

    li.append(content, editBtn, delBtn);
    taskList.appendChild(li);
}

async function addTask() {
    const title = taskInput.value.trim();
    const dueDate = dueDateInput.value || null;
    const priority = priorityInput.value;

    if (!title) return;

    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, dueDate, priority }),
    });

    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "low";
    loadTasks();
}

async function editTask(task) {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle && newTitle.trim() && newTitle !== task.title) {
        await fetch(`/tasks/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
        });
        loadTasks();
    }
}

searchInput.addEventListener("input", loadTasks);
addBtn.addEventListener("click", addTask);
loadTasks();
