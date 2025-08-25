const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    set: (v) => v.toUpperCase(), // always store in uppercase
    required: true,
  },
  regno: String,
  rollno: String,
  email: String,
  mobile: String,
  department: String,
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [], // ensures it's always an array
  },
});

StudentSchema.path("notifications").default(() => []);

StudentSchema.methods.generateAuthToken = function () {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(
      { id: this._id, name: this.name, rollno: this.rollno, regno: this.regno },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } catch (err) {
    console.error("Error in generating token:", err.message);
    throw err; // Rethrow to handle in the controller
  }
};

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
