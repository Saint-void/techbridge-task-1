const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const tasksFile = path.join(__dirname, "data", "tasks.json");
const validStatuses = ["completed", "in-progress", "not-started"];
const frontendDirectory = path.join(__dirname, "..");

app.use(express.json());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  if (request.method === "OPTIONS") {
    return response.sendStatus(204);
  }
  next();
});

app.use(express.static(frontendDirectory));

function readTasks() {
  return JSON.parse(fs.readFileSync(tasksFile, "utf8"));
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, `${JSON.stringify(tasks, null, 2)}\n`);
}

app.get("/api/status", (request, response) => {
  response.json({ status: "connected", service: "TechBridge Task API" });
});

app.get("/api/tasks", (request, response) => {
  response.json(readTasks());
});

app.get("/api/tasks/:id", (request, response) => {
  const task = readTasks().find(
    (item) => item.id === Number(request.params.id),
  );
  if (!task) {
    return response.status(404).json({ error: "Task not found" });
  }
  response.json(task);
});

app.put("/api/tasks/:id", (request, response) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(
    (item) => item.id === Number(request.params.id),
  );
  if (taskIndex === -1) {
    return response.status(404).json({ error: "Task not found" });
  }

  const status = request.body.status;
  if (!validStatuses.includes(status)) {
    return response.status(400).json({
      error: "Status must be completed, in-progress, or not-started",
    });
  }

  tasks[taskIndex].status = status;
  writeTasks(tasks);
  response.json(tasks[taskIndex]);
});

app.post("/api/tasks", (request, response) => {
  const tasks = readTasks();
  const requiredFields = ["title", "description"];
  if (requiredFields.some((field) => !request.body[field])) {
    return response.status(400).json({
      error: "Title and description are required",
    });
  }

  const nextNumber = tasks.length ? Math.max(...tasks.map((task) => task.number)) + 1 : 1;
  const task = {
    id: nextNumber,
    number: nextNumber,
    day: request.body.day || nextNumber * 3,
    title: request.body.title,
    description: request.body.description,
    status: validStatuses.includes(request.body.status)
      ? request.body.status
      : "not-started",
    objective: request.body.objective || "",
    deliverable: request.body.deliverable || "",
    tags: Array.isArray(request.body.tags) ? request.body.tags : [],
  };
  tasks.push(task);
  writeTasks(tasks);
  response.status(201).json(task);
});

app.delete("/api/tasks/:id", (request, response) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(
    (item) => item.id === Number(request.params.id),
  );
  if (taskIndex === -1) {
    return response.status(404).json({ error: "Task not found" });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  writeTasks(tasks);
  response.json(deletedTask);
});

app.listen(port, () => {
  console.log(`TechBridge Task API listening at http://localhost:${port}`);
});
