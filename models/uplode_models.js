const mongoose = require("mongoose");

const uplodeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  options: {
    type: String,
    required: true,
    enum: ["official", "exam", "vacation", "other"], // Validates specific values
  },
  name: String,
  path: String,
  size: Number,
  mimetype: String,
});

const uplodeData = new mongoose.model("uploded-data", uplodeSchema);

module.exports = uplodeData;
