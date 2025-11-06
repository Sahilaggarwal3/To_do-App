# `system-overview.md` — Architecture**

```markdown
# System Overview — TaskMaster

TaskMaster follows a **client-server architecture**:

- **Frontend (Client)**: HTML/CSS/JS  
- **Backend (Server)**: Node.js + Express  
- **Data Storage**: `tasks.json`

---

## Communication

The frontend communicates with backend using **HTTP requests**:

- **GET /tasks** → Fetch all tasks  
- **POST /tasks** → Add task  
- **DELETE /tasks/:id** → Delete task

This pattern is called **RESTful API**.

---

## Project Flow

User Input (frontend)
↓
script.js sends HTTP request
↓
server.js updates tasks.json
↓
Response sent back → frontend updates UI

