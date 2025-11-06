# `backend.md` — Backend Explanation**

```markdown
#  Backend — Node.js + Express

The backend lives in `server.js` and handles:

- Serving frontend files (`public/`)  
- Managing tasks stored in `tasks.json`  
- Handling HTTP requests (REST pattern: GET, POST, DELETE)

---

## `server.js`

Key parts:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

## 'routes'

-- GET /tasks → returns tasks from tasks.json

-- POST /tasks → add a new task

-- DELETE /tasks/:id → delete a task by id

Example snippet:

app.get('/tasks', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json'));
    res.json(tasks);
});

## 'Data Storage'

All tasks are saved in:

tasks.json


It’s a simple JSON array:

[
    {"id":1,"task":"Buy groceries","completed":false},
    {"id":2,"task":"Clean room","completed":true}
]

