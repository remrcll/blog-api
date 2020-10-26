const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      next(error);
    }
  };
  
  exports.getPost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post)
        throw new Error(`No post with id: ${req.params.id}`);
      res.send(post);
    } catch (error) {
      next(error);
    }
  };
  
  exports.addPost = async (req, res, next) => {
    try {
      const post = new Post(req.body);
      const data = await post.save();
  
      res.send(data);
    } catch (error) {
      next(error);
    }
  };
  
  exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const psotData = req.body;
  
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!post)
        throw new Error(`No post with id: ${req.params.id}`);
  
      res.send(post);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.findByIdAndDelete(
        req.params.id
      );
      if (!post)
        throw new Error(`No post with id: ${req.params.id}`);
      res.send(post);
    } catch (error) {
      next(error);
    }
  };
  