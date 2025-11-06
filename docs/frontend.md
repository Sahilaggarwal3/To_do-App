# **`frontend.md` — Frontend Explanation**

```markdown
# 🖥 Frontend — TaskMaster UI

The frontend is in the `public/` folder:
public/
├── index.html
├── style.css
└── script.js

---

## `index.html`

This is the main HTML file. It contains:

- Input field to add new tasks  
- Task list display  
- Buttons to mark tasks done or delete

> Code snippet from `index.html`:

```html
<input type="text" id="taskInput" placeholder="Enter a new task">
<ul id="taskList"></ul>

## 'style.css'

Controls layout, colors, and hover effects.

Example snippet:

body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
}

#taskList li.completed {
    text-decoration: line-through;
}

## 'script.js'

Handles interaction:

Add new task

Delete task

Mark as complete

Save/load tasks from tasks.json via backend

Example snippet:

document.getElementById('taskInput').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addTask(this.value);
        this.value = '';
    }
});

(The frontend interacts with backend routes in server.js to save/load tasks.)
