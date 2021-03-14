const Sniper = require('../models/sniperModel');
// const itemController = require('../controllers/itemController');

let sniper;

const checkSniper = async () => {
  sniper = await Sniper.findOne();
  if (sniper !== null) return;

  const newSniper = new Sniper({
    money: 500,
    active: false,
    items: []
  });
  sniper = await newSniper.save();
};

const getSniperInfo = async (req, res) => {
  await checkSniper();
  return sniper;
};

// const addItem = async (req, res) => {}

exports.getSniperInfo = getSniperInfo;
