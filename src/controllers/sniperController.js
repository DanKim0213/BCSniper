const Sniper = require('../models/sniperModel');
const itemController = require('./itemController');

let sniper;

const checkSniper = async () => {
  try {
    sniper = await Sniper.findOne();
    if (sniper !== null) return;

    const newSniper = new Sniper({
      money: 500,
      active: false,
      items: []
    });
    sniper = await newSniper.save();
    return sniper;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// GET
const getSniperInfo = async (req, res) => {
  await checkSniper();
  try {
    res.status(200).json(sniper);
    // res.send('OK get sniper info');
  } catch (err) {
    res.status(400).send(err);
  }
};

// TODO: code here...
// const updateSniper = async (req, res) => { trycatch}

// POST
const addItem = async (req, res) => {
  try {
    const input = await itemController.createItem(req.body.name);
    res.status(201).json(input);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getSniperInfo = getSniperInfo;
exports.addItem = addItem;
