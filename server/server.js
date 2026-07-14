const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 TaskFlow Pro Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});