import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDashboardStats } from "../api/dashboardApi";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

 useEffect(() => {
  if (!user) {
    navigate("/login");
    return;
  }

  loadDashboard();
}, [navigate, user]);

const loadDashboard = async () => {
  try {
    const response = await getDashboardStats();
    setTasks(response.data);
  } catch (error) {
    toast.error("Failed to load dashboard");
  }
};
const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
  (task) => task.status === "Pending"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

const highPriority = tasks.filter(
  (task) => task.priority === "High"
).length;
  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  toast.success("Logged out successfully!");

  setTimeout(() => {
    navigate("/login");
  }, 1000);
};
  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2>📋 TaskFlow Pro Dashboard</h2>
          <h5 className="text-muted">
            Welcome, {user?.name}
          </h5>
        </div>

        <div>

  <a
    href="https://github.com/DHANUSH-916/TaskFlow-Pro"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-dark me-2"
  >
    GitHub
  </a>

  <Link to="/tasks" className="btn btn-primary me-2">
    + Manage Tasks
  </Link>

  <button
    className="btn btn-danger"
    onClick={logout}
  >
    Logout
  </button>

</div>

      </div>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Tasks</h5>
            <h1>{totalTasks}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Pending</h5>
            <h1 className="text-warning">{pendingTasks}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Completed</h5>
            <h1 className="text-success">{completedTasks}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>High Priority</h5>
            <h1 className="text-primary">{highPriority}</h1>
          </div>
        </div>

      </div>

      <div className="card shadow mt-5 p-4">

        <h4>Recent Tasks</h4>

        <table className="table mt-3">

          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
  {tasks.length === 0 ? (
    <tr>
      <td colSpan="3" className="text-center">
        No Tasks
      </td>
    </tr>
  ) : (
    tasks.slice(0, 5).map((task) => (
      <tr key={task._id}>
        <td>{task.title}</td>

        <td>
          <span
            className={
              task.status === "Completed"
                ? "badge bg-success"
                : "badge bg-warning"
            }
          >
            {task.status}
          </span>
        </td>

        <td>
          <span
            className={
              task.priority === "High"
                ? "badge bg-danger"
                : task.priority === "Medium"
                ? "badge bg-primary"
                : "badge bg-secondary"
            }
          >
            {task.priority}
          </span>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;