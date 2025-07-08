let jwt = require("jsonwebtoken");
let User = require("../model/User");
exports.isAuthenticated = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login to access this resource",
      });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
