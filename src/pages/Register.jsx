import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">📝 Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;