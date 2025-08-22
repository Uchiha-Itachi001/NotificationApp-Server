const uplodeData = require("../models/uplode_models");
const fs = require("fs");

const uplode_form_data = async (req, res) => {
  try {
    const { type, massage, details, options } = req.body;
    console.log("req.body", req.body);
    // Validation for required fields based on type
    if (!type || !details || !options) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (type === "Massage" && !massage) {
      return res.status(400).json({ message: "Massage content is required" });
    }

    let fileData = {};
    if (req.file) {
      const { originalname, path, size, mimetype } = req.file;
      fileData = { name: originalname, path, size, mimetype };
    }

    const uplode = new uplodeData({
      type,
      massage: type === "Massage" ? massage : undefined,
      details,
      options,
      ...fileData,
    });

    await uplode.save();
    res.status(201).json({ message: "Data uploaded successfully", uplode });
  } catch (err) {
    console.error("Error From Post uplodeFormData ::\n", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
const show_data = async (req, res) => {
  try {
    console.log("hello");
    const files = await uplodeData.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
};

const delete_data = async (req, res) => {
  try {
    const id = req.body.id;

    const file = await uplodeData.findById(id);
    if (!file) {
      return res.status(404).json({ msg: "Data not found" });
    }
    if (file.type === "File") {
      // Remove the file from the filesystem
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }
    await uplodeData.findByIdAndDelete(id);

    res.status(200).json({ msg: "Data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting file" });
  }
};

module.exports = { uplode_form_data, show_data, delete_data };
