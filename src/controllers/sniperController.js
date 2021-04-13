const Sniper = require('../models/sniperModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllSniper = factory.getAll(Sniper);
exports.getSniper = factory.getOne(Sniper, { path: 'items' });
exports.createSniper = factory.createOne(Sniper);
exports.updateSniper = factory.updateOne(Sniper);
exports.deleteSniper = factory.deleteOne(Sniper);

// The route checks if Sniper belongs to User
exports.matchUser = (req, res, next) => {
  try {
    // req.user.sniper._id is Object while id is String
    if (!req.user.sniper) {
      return next(
        new AppError('You are not allowed to access to the Sniper', 403)
      );
    }
    req.params.id = req.user.sniper.id;
    next();
  } catch (err) {
    next(err);
  }
};

exports.registerSniper = async (req, res, next) => {
  try {
    if (req.user.sniper) {
      return next(new AppError('You already have a Sniper.', 403));
    }
    const sniper = await Sniper.create({ money: req.body.money });
    const currentUser = await User.findByIdAndUpdate(
      req.user._id,
      { sniper: sniper._id },
      { new: true, runValidators: true }
    );
    req.user = currentUser;

    res.status(201).json({
      status: 'success',
      data: sniper
    });
  } catch (err) {
    next(err);
  }
};

exports.unregisterSniper = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { sniper: undefined });
    req.user.sniper = undefined;

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
