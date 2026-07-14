import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log("Login Response:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message || "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">🔐 Login</h2>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;