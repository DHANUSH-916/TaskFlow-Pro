import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 TaskFlow Pro Dashboard</h2>

        <Link to="/tasks" className="btn btn-primary">
          + Manage Tasks
        </Link>
      </div>

      <div className="row">

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h5>Total Tasks</h5>
            <h1>12</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h5>Pending</h5>
            <h1 className="text-warning">5</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h5>Completed</h5>
            <h1 className="text-success">6</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow p-3">
            <h5>In Progress</h5>
            <h1 className="text-primary">1</h1>
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

            <tr>

              <td>Complete React Project</td>

              <td>
                <span className="badge bg-warning">
                  Pending
                </span>
              </td>

              <td>
                <span className="badge bg-danger">
                  High
                </span>
              </td>

            </tr>

            <tr>

              <td>Prepare Internship Report</td>

              <td>
                <span className="badge bg-success">
                  Completed
                </span>
              </td>

              <td>
                <span className="badge bg-primary">
                  Medium
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;