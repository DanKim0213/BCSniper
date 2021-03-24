const Sniper = require('../models/sniperModel');
const AppError = require('../utils/appError');

const { SNIPERID } = process.env;

const getSniperInfo = async (req, res, next) => {
  try {
    const sniper = await Sniper.findById(SNIPERID);
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
const updateSniper = async (req, res, next) => {
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

exports.getSniperInfo = getSniperInfo;
exports.updateSniper = updateSniper;
