let Post = require("../model/Post");
let User = require("../model/User");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: req.body.public_id,
        url: req.body.url,
      },
      owner: req.user._id,
    };

    const newPost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(newPost._id);
    await user.save();

    res.status(200).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await post.deleteOne();

    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      let index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPostsOfFollowing = async (req, res) => {
  try{
    let user = await User.findById(req.user._id);
    let posts = await Post.find({ owner: { $in: user.following } });
    res.status(200).json({
      success: true,
      posts,
    });
  }catch(error){ 
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}