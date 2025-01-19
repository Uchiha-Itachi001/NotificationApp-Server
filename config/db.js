const mongoose = require("mongoose");

const URI = process.env.DBURI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;