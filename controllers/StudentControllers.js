const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const StudentModel = require("../models/StudentModel");
const UploadData = require("../models/uplode_models");

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
    res.status(200).json({ message: "Student record deleted successfully" });
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

const addId = async (req, res) => {
  try {
    const { userid, notificationId } = req.body;

    const user = await StudentModel.findById(userid);
    const notification = await UploadData.findById(notificationId);
    console.log(`user : ${user} \n notification : ${notificationId}`);
    
    if (!user || !notification) {
      return res.status(404).json({ message: "User not found" });
    }
    // Ensure array exists (for old docs without field)
    if (!user.notifications) {
      user.notifications = [];
    }
    // Avoid duplicates (optional)
    if (!user.notifications.includes(notificationId)) {
      user.notifications.push(notificationId);
    }
    console.log("Product id added ", notificationId);
    console.log("user data", user);
    await user.save();

    res.status(200).send("Product ID added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error", error);
  }
};

const UserID = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await StudentModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log("User find by Id successfull");

    res.status(200).json({ data: user});
  } catch (error) {
    res.status(500).send("Error");
  }
};

const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body; // expecting { ids: ["id1", "id2", ...] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Please provide an array of IDs" });
    }

    const result = await StudentModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: `${result.deletedCount} students deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting students:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { add, List, deleteAll, deleteitem,deleteMany ,addId,UserID};
