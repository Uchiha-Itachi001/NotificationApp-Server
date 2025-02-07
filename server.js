require("dotenv").config();
//!modules

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const router = require("./routers/uplode");
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
    

//@Routers

//@middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", router);

connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
