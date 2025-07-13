const User = require("../model/User");
let Post = require("../model/Post");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let crypto = require("crypto");
const { sendEmail } = require("../middleware/sendEmail");
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
    let hash = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hash,
      avatar: { public_id: "sample id", url: "sample url" },
    });
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    let userToFollow = await User.findById(req.params.id);
    let loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.following.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Followed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("+password");
    let { oldPassword, newPassword } = req.body;
    let isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is incorrect",
      });
    }

    let hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let { name, email } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let posts = user.posts;
    let followers = user.followers;
    let followings = user.following;

    for (let i = 0; i < posts.length; i++) {
      let post = await Post.findById(posts[i]);
      await post.deleteOne();
    }

    for (let i = 0; i < followers.length; i++) {
      let follower = await User.findById(followers[i]);
      let index = follower.following.indexOf(req.user._id);
      follower.following.splice(index, 1);
      await follower.save();
    }

    for (let i = 0; i < followings.length; i++) {
      let follows = await User.findById(followings[i]);
      let index = follows.followers.indexOf(req.user._id);
      follows.following.splice(index, 1);
      await follows.save();
    }

    await user.deleteOne();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate("posts");
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

exports.getUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).populate("posts");
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

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;

    const message = `Your password reset token is :- \n\n ${resetUrl} \n\nIf you have not requested this email then please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has been expired",
      });
    }

    let { password } = req.body;
    let hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
