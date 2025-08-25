const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const StudentModel = require("../models/student_model"); // ✅ use consistent file
const UploadData = require("../models/uplode_models");

// 📌 Upload & process Excel file
const add = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filepath = path.join(__dirname, "../uploads", req.file.filename);

    // Read Excel
    const workbook = xlsx.readFile(filepath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    let insertedData = [];

    for (let student of jsonData) {
      const exists = await StudentModel.findOne({ rollNumber: student.rollNumber });
      if (!exists) {
        const newStudent = new StudentModel(student);
        await newStudent.save();
        insertedData.push(newStudent);
      }
    }

    // remove file after processing
    fs.unlinkSync(filepath);

    res.json({
      message: "File processed successfully",
      inserted: insertedData.length,
      skipped: jsonData.length - insertedData.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get all students
const List = async (req, res) => {
  try {
    const data = await StudentModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete one student by ID
const deleteitem = async (req, res) => {
  try {
    const { id } = req.params; // ✅ use params, not body
    await StudentModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete all students
const deleteAll = async (req, res) => {
  try {
    await StudentModel.deleteMany({});
    res.json({ message: "All student records have been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Add notification ID to a student
const addId = async (req, res) => {
  try {
    const { userid, notificationId } = req.body;

    const user = await StudentModel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = await UploadData.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (!user.notifications) {
      user.notifications = [];
    }

    if (!user.notifications.includes(notificationId)) {
      user.notifications.push(notificationId);
    }

    await user.save();
    res.status(200).json({ message: "Notification ID added successfully" });
  } catch (error) {
    console.error("addId error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get user by ID
const UserID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await StudentModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { add, List, deleteAll, deleteitem, addId, UserID };
