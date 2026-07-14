const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("🔄 Connecting to MongoDB...");
  console.log("URI Loaded:", !!process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ Connection Error:");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;