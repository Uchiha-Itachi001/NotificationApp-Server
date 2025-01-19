const uplodeData = require("../models/uplode_models");

const uplode_form_data = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { filename, details, options } = req.body;
    if (!filename || !details || !options) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { originalname, path, size, mimetype } = req.file;

    const uplode = new uplodeData({
      filename,
      details,
      options,
      name: originalname,
      path,
      size,
      mimetype,
    });

    await uplode.save();
    res.status(201).json({ message: "File uploaded successfully", uplode }); 
  } 
  catch (err) {
    console.error("Error From Post uplodeFormData ::\n" + err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};


const show_data = async (req, res) => {
    try {
      const files = await uplodeData.find();
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files', error });
    }
  };
const delete_data = async (req, res) => {
    try {
      const id = req.body.id;
      
      console.log("ID received:", id);
      const data = await uplodeData.findByIdAndDelete(id);
      if (!data) {
          return res.status(404).json({ msg: "Data not found" });
      }
      res.status(200).json({ msg: "Data deleted"  });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error deleting file" });
    }
  };
  

module.exports = { uplode_form_data,show_data ,delete_data};
