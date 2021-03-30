const Sniper = require('../models/sniperModel');
const AppError = require('../utils/appError');

exports.getSniper = async (req, res, next) => {
  try {
    const sniper = await Sniper.findById(req.params.id);
    if (!sniper) {
      return next(new AppError('Invalid Sniper ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: sniper
    });
  } catch (err) {
    next(err);
  }
};

// TODO: updateSniper is not defined yet
exports.updateSniper = async (req, res, next) => {
  try {
    // Sniper.findByIdAndUpdate()
    res.status(500).json({
      status: 'failed',
      message: 'path not defined'
    });
  } catch (err) {
    next(err);
  }
};
