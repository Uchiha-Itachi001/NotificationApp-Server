require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const uploadRouter = require("./routers/uplode");
const Studentrouter = require("./routers/StudentRouterds");
const authRouter = require("./routers/authRouts");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routers
app.use("/api/auth", uploadRouter);
app.use("/api/authentication", authRouter);
app.use("/api/students", Studentrouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hello 👋 Server running...");
});

// DB + Start
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
