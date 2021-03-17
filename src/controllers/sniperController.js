const Sniper = require('../models/sniperModel');

const { SNIPERID } = process.env;

// GET
const getSniperInfo = async (req, res) => {
  try {
    const sniper = await Sniper.findById(SNIPERID);
    res.status(200).json({
      status: 'success',
      data: sniper
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

// TODO: updateSniper is not defined yet
const updateSniper = async (req, res) => {
  // const sniper = await Sniper.findById(SNIPERID);
  res.status(500).json({
    status: 'failed',
    message: 'path not defined'
  });
};

exports.getSniperInfo = getSniperInfo;
exports.updateSniper = updateSniper;
