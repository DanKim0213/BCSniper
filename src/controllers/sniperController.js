const Sniper = require('../models/sniperModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllSniper = factory.getAll(Sniper);
exports.getSniper = factory.getOne(Sniper, { path: 'items' });
exports.createSniper = factory.createOne(Sniper);
exports.updateSniper = factory.updateOne(Sniper);
exports.deleteSniper = factory.deleteOne(Sniper);

exports.getMe = async (req, res, next) => {
  try {
    const sniper = await Sniper.findById(req.user.sniper);
    if (!sniper) next(new AppError('No sniper found with that ID', 400));

    res.status(200).json({
      status: 'success',
      data: sniper
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const sniper = await Sniper.findByIdAndUpdate(req.user.sniper, req.body, {
      new: true,
      runValidators: true
    });
    if (!sniper) next(new AppError('No sniper found with that ID', 400));

    res.status(200).json({
      status: 'success',
      data: sniper
    });
  } catch (err) {
    next(err);
  }
};
