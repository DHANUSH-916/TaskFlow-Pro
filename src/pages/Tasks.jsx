import { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTask = () => {
    if (title.trim() === "") {
      alert("Enter a task title");
      return;
    }

    if (editingId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId
            ? { ...task, title, priority }
            : task
        )
      );
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title,
          priority,
          status: "Pending",
        },
      ]);
    }

    setTitle("");
    setPriority("Medium");
  };

  const editTask = (task) => {
    setTitle(task.title);
    setPriority(task.priority);
    setEditingId(task.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  return (
    <div className="container mt-5">

      <h2>📋 Task Management</h2>

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
                    No Tasks
                  </td>

                </tr>

              ) : (

                tasks.map((task) => (

                  <tr key={task.id}>

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
                        onClick={() => completeTask(task.id)}
                      >
                        Complete
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
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