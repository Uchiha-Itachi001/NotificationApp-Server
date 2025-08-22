const StudentModel = require("../models/StudentModel");

const login = async (req, res) => {
  try {
    // Extract rollno, regno, and name from request body
    console.log(req.body);
    const { rollno, regno, name } = req.body;

    // Validate input
    if (!rollno || !regno || !name) {
      return res
        .status(400)
        .json({
          error: "Name, roll number, and registration number are required",
        });
    }

    // Remove all spaces from the name for database query
    const formattedName = name.toUpperCase().trim();
    console.log("formattedName", formattedName);
    // Find the student in the database
    const user = await StudentModel.findOne({
      rollno,
      regno,
      name: formattedName,
    });

    if (!user) {
      return res.status(400).send("Invalid Cradinsial");
    }

    // Generate JWT token
    const token = user.generateAuthToken();
    if (!token) {
      throw new Error("Token generation failed");
    }

    // Send success response with token
    res.status(200).json({
      User: user,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const UserData = async (req, res) => {
  try {
    const data = req.user;
    console.log("Login User Data", data);
    res.status(200).json({ data });
  } catch (err) {
    console.error("Error in userRoutes:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login, UserData };
