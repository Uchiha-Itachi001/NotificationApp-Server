const express = require("express");
const { uplode_form_data, show_data, delete_data } = require("../controllers/uplodeFormData");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();


// Configure Multer storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uplode_form_data); // Accept file + fields
router.get("/files", show_data);
router.delete("/delete", delete_data);
// 
module.exports = router;
