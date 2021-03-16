const Sniper = require('../models/sniperModel');
const Item = require('../models/itemModel');

const { SNIPERID } = process.env;

// GET
const getSniperInfo = async (req, res) => {
  try {
    const sniper = await Sniper.findOne();
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
  res.status(500).json({
    status: 'failed',
    message: 'path not defined'
  });
};

// TODO: fix this function
// POST
const registerItem = async (req, res) => {
  try {
    let sniper = await Sniper.findById(SNIPERID);
    const item = await Item.findById(req.params.id);
    const newItems = sniper.items.push(item);
    sniper = await Sniper.findByIdAndUpdate(
      SNIPERID,
      { items: newItems },
      { new: true, runValidators: true }
    );
    res.status(201).json({
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

// TODO: unregisterItem is not defined yet
const unregisterItem = async (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'not defined yet'
  });
};

exports.getSniperInfo = getSniperInfo;
exports.updateSniper = updateSniper;
exports.registerItem = registerItem;
exports.unregisterItem = unregisterItem;

// req.params.id
// It's not a good idea to use the sniper we created here...
// To keep consistency, we need to use the sniper which comes from MongoDB
// Also, use Model instead of other controllers.
