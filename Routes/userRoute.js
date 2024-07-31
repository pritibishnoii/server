//**Import modules
const express = require("express");
const {
  registerUser,
  handleLogin,
  updateUser,
  userDetails,
} = require("../controllers/userController");
const validateUser = require("../middelwares/validateUser");
const router = express.Router();

//*** */
router.get("/health", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});

// ***Create a Register Route
router.post("/register", validateUser, registerUser);

// ****Create a Login Route
router.post("/login", handleLogin);

router.put("/updateuser/:userId", updateUser); // New route for updating user details

router.get("/userdetails/:id", userDetails);

module.exports = router;
