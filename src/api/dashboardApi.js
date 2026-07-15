import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-pro-g8di.onrender.com/api",
});

export const getDashboardStats = () => API.get("/tasks");