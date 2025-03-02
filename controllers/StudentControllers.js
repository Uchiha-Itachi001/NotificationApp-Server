const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const StudentModel = require("../models/StudentModel");

const add = async (req, res) => {
  try {
    const filepath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook = xlsx.readFile(filepath);
    const sheet_name_list = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name_list];
    const jsondata = xlsx.utils.sheet_to_json(sheet);

    await StudentModel.insertMany(jsondata);
    fs.unlinkSync(filepath);
    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const List = async (req, res) => {
  try {
    const data = await StudentModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteitem = async (req, res) => {
  try {
    const { id } = req.body;
    await StudentModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Student record deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAll = async (req, res) => {
  try {
    await StudentModel.deleteMany({});
    res.json({ message: "All student records have been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { add, List, deleteAll, deleteitem };
