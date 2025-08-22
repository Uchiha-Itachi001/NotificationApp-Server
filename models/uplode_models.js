const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["File", "Massage"], // "Message" is not included
      required: true,
    },
    massage: { type: String },
    details: { type: String, required: true },
    options: {
      type: String,
      required: true,
      enum: ["official", "exam", "vacation", "other"],
    },
    name: { type: String }, // Ensure file name is always stored
    path: { type: String }, // Store full path
    size: { type: Number }, // Ensure file size is stored
    mimetype: { type: String }, // Ensure MIME type is recorded
  },
  { timestamps: true }
);

const UploadData = mongoose.model("uploaded-data", uploadSchema);

module.exports = UploadData;
