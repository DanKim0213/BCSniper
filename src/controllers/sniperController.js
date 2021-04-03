const Sniper = require('../models/sniperModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllSniper = factory.getAll(Sniper);
exports.getSniper = factory.getOne(Sniper, { path: 'items' });
exports.createSniper = factory.createOne(Sniper);
exports.updateSniper = factory.updateOne(Sniper);
exports.deleteSniper = factory.deleteOne(Sniper);

// must be loosley coupled
// TODO: make createOne consistent: Sniper depends on User
// exports.createSniper = async (req, res, next) => {};

// The route checks if Sniper belongs to User
exports.matchUser = (req, res, next) => {
  try {
    if (!req.user.sniper === req.params.id) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.removeSniperRef = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
