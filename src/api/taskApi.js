import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-pro-g8di.onrender.com/api",
});

// Get all tasks
export const getTasks = () => API.get("/tasks");

// Create task
export const createTask = (task) => API.post("/tasks", task);

// Update task
export const updateTask = (id, task) =>
  API.put(`/tasks/${id}`, task);

// Delete task
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);