const express = require("express");
const { uplode_form_data ,show_data,delete_data} = require("../controllers/uplodeFormData");
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.delete("/delete",delete_data)
router.get("/files",show_data)
router.post("/upload",upload.single('file'),uplode_form_data)

module.exports = router;