require("dotenv").config();
//!modules

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const router = require("./routers/uplode");
const path = require("path");
const fs = require("fs");
const Studentrouter = require("./routers/StudentRouterds");
const authRouter = require("./routers/authRouts");
const authMiddleware = require("./middleware/authMiddleware");
const { UserData } = require("./controllers/authControllers");
const app = express();
 
app.use("/uploads", express.static("uploads"));

//@middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploaddir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploaddir)) {
  fs.mkdirSync(uploaddir);
}

//@Routers
app.use("/api/auth", router);
app.use("/api/authentication", authRouter);
app.use("/api/students", Studentrouter);

app.get("/",(req,res)=>{
    res.send("HEllo")
})
connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
