const User = require("../model/User");
//4] import bcrypt package
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Registeer 👇👇👇👇
const registerUser = async (req, res, next) => {
  try {
    //*** */ destructure the form data values from req.body
    const { name, email, password } = req.body;
    //**checked user existed or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists, please use another email address",
      });
    } else {
      //*** generate hashedpassword
      const hashedPassword = await bcrypt.hash(password, 10);
      //*** saving the form data values to the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      // 👇👇👇👇👇
      // console.log(`newUSer data --->  ${newUser}`)
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        status: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Login 👇👇👇👇
const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  try {
    if (userExist) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExist.password
      );
      if (isPasswordCorrect) {
        // We will create a token
        const token = jwt.sign({ userID: userExist._id }, PRIVATE_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "Login Successful",
          token,
          userData: {
            email: userExist.email,
            userName: userExist.name,
            userID: userExist._id,
          },
        });
      } else {
        res.status(401).json({
          message: "Password or email are incorrect",
        });
      }
    } else {
      res.status(404).json({
        message: "The user not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  // console.log(req.params)
  console.log(req.params.userId);
  try {
    const { userId } = req.params;
    // console.log(req.params);
    const { username, email, newpassword, oldpassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (oldpassword && newpassword) {
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is not correct" });
      }
      user.password = await bcrypt.hash(newpassword, 12);
      user.confirmpassword = user.password;
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      userDetails,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};

module.exports = { registerUser, handleLogin, updateUser, userDetails };
