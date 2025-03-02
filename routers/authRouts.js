const express = require("express");
const authRouter = express.Router();
const { login, UserData } = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");
authRouter.post("/login", login);
authRouter.get("/user",authMiddleware,UserData);
module.exports = authRouter;