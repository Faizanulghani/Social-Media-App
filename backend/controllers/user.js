const User = require("../model/User");
const brcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    let hash = await brcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hash,
      avatar: { public_id: "sample id", url: "sample url" },
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
