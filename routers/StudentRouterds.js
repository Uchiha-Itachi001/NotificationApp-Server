const express = require("express");
const Studentrouter = express.Router();
const multer = require("multer");
const { add, List, deleteAll, deleteitem, addId, UserID } = require("../controllers/StudentControllers");
const { deleteMany } = require("../models/uplode_models");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {  // <-- Use 'cb' instead of 'cd'
        cb(null, 'uploads/');  // Correct callback function
    },
    filename: (req, file, cb) => {
        const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqSuffix + "-" + file.originalname);
    }
});

const uploads = multer({ storage: storage });

Studentrouter.post("/upload", uploads.single("file"), add);
Studentrouter.get("/data", List);
Studentrouter.post("/delete", deleteitem); // New delete route
Studentrouter.delete("/delete-all", deleteAll); // New delete route
Studentrouter.delete("/deleteMany", deleteMany);
Studentrouter.post("/notify", addId); // New delete route
Studentrouter.post("/user", UserID); // New delete route
module.exports = Studentrouter;
