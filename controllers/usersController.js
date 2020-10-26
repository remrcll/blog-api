const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      next(error);
    }
  };
  
  exports.getUser = async (req, res, next) => {
    try {
      // const user = await User.find({_id: req.params});
      const user = await User.findById(req.params.id);
      if (!user)
        throw new Error(`No user with id: ${req.params.id}`);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  
  exports.addUser = async (req, res, next) => {
    try {
      const user = new User(req.body);
      const data = await user.save();
  
      res.send(data);
    } catch (error) {
      next(error);
    }
  };
  
  exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!user)
        throw new Error(`No user with id: ${req.params.id}`);
  
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(
        req.params.id
      );
      if (!user)
        throw new Error(`No user with id: ${req.params.id}`);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  