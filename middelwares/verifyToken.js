const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("authHeader---->>>",authHeader)
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token Not Found or Invalid",
      });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_SIGN_KEY);
    req.user = decoded; 

    next(); 
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      message: "Token Not Found or Invalid",
    });
  }
};

module.exports = verifyToken;