const express = require("express");
const Studentrouter = express.Router();
const multer = require("multer");
const { add, List, deleteAll, deleteitem, addId, UserID } = require("../controllers/StudentControllers");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {  // <-- Corrected 'cb'
        cb(null, 'uploads/');  // save files inside uploads folder
    },
    filename: (req, file, cb) => {
        const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqSuffix + "-" + file.originalname);
    }
});

const uploads = multer({ storage: storage });

// 🔹 Routes
Studentrouter.post("/upload", uploads.single("file"), add);  // upload excel file
Studentrouter.get("/data", List);                            // get all students
Studentrouter.post("/delete", deleteitem);                   // delete by ID
Studentrouter.delete("/delete-all", deleteAll);              // delete all students
Studentrouter.post("/notify", addId);                        // add notification ID to user
Studentrouter.post("/user", UserID);                         // get user by ID

module.exports = Studentrouter;
