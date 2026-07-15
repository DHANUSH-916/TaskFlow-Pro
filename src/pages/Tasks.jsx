import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskApi,
} from "../api/taskApi";
import { toast } from "react-toastify";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
  loadTasks();
}, []);

const loadTasks = async () => {
  try {
    const response = await getTasks();
    setTasks(response.data);
  } catch (error) {
    toast.error("Failed to load tasks");
  }
};

  const saveTask = async () => {
  if (title.trim() === "") {
    toast.error("Enter a task title");
    return;
  }

  try {
    if (editingId) {
      await updateTask(editingId, {
        title,
        priority,
      });

      toast.success("Task Updated");
      setEditingId(null);
    } else {
      await createTask({
        title,
        priority,
        status: "Pending",
      });

      toast.success("Task Added");
    }

    setTitle("");
    setPriority("Medium");

    loadTasks();

  } catch (error) {
    toast.error("Something went wrong");
  }
};
  const editTask = (task) => {
    setTitle(task.title);
    setPriority(task.priority);
    setEditingId(task._id);
  };

  const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await deleteTaskApi(id);

    toast.success("Task Deleted");

    loadTasks();
  } catch (error) {
    toast.error("Delete Failed");
  }
};

  const completeTask = async (task) => {
  try {
    await updateTask(task._id, {
      title: task.title,
      priority: task.priority,
      status: "Completed",
    });

    toast.success("Task Completed");

    loadTasks();
  } catch (error) {
    toast.error("Failed to update task");
  }
};

const filteredTasks = tasks
  .filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    task.status === statusFilter;

  const matchesPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter;

  return (
  matchesSearch &&
  matchesStatus &&
  matchesPriority
);
})
.sort((a, b) => {
  if (sortBy === "Newest") {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  if (sortBy === "Oldest") {
    return new Date(a.createdAt) - new Date(b.createdAt);
  }

  if (sortBy === "Priority") {
    const order = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    return order[a.priority] - order[b.priority];
  }

  return 0;
});

return (
    <div className="container mt-5">

      <h2>📋 Task Management</h2>
      <div className="row mt-4 mb-3">

  <div className="col-md-3">
  <select
    className="form-select"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option>Newest</option>
    <option>Oldest</option>
    <option>Priority</option>
  </select>
</div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option>All</option>
      <option>Pending</option>
      <option>Completed</option>
    </select>
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
    >
      <option>All</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>
  </div>

</div>

      <div className="card shadow p-4 mt-4">

        <div className="mb-3">
          <label>Task Title</label>

          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />
        </div>

        <div className="mb-3">

          <label>Priority</label>

          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        <button
          className="btn btn-primary"
          onClick={saveTask}
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>

      </div>

      <div className="card shadow mt-4">

        <div className="card-body">

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {tasks.length === 0 ? (

                <tr>

                  <td colSpan="4" className="text-center">
                    <div className="text-center py-4">
  <h5>No Tasks Found</h5>
  <p className="text-muted">
    Create your first task to get started.
  </p>
</div>
                  </td>

                </tr>

              ) : (

                filteredTasks.map((task) => (

                  <tr key={task._id}>

                    <td>{task.title}</td>

                    <td>{task.priority}</td>

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

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editTask(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-success btn-sm me-2"
                        disabled={task.status === "Completed"}
                        onClick={() => completeTask(task)}
                      >
                        {task.status === "Completed" ? "Completed" : "Complete"}
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Tasks;