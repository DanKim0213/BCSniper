const axios = require('axios');
const Item = require('../models/itemModel');

const createItem = async (req, res) => {
  try {
    const input = await axios.get(
      `https://api.blockchain.com/v3/exchange/tickers/${req.body.symbol}`
    );
    const item = await Item.create({
      symbol: req.body.symbol,
      price: input.data.price_24h * 1,
      maxPrice: input.data.price_24h * 1 + 100,
      status: 'joining'
    });
    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

const getItem = async (req, res) => {
  try {
    const obj = await Item.findOne({ symbol: req.params.symbol });
    res.status(200).json({
      status: 'success',
      data: obj
    });
  } catch (err) {
    res.status(400).json({
      status: 'success',
      message: err
    });
  }
};

// TODO: fix this function
const updateItem = async (req, res) => {
  try {
    const newData = await Item.findOneAndUpdate(
      { symbol: req.params.symbol },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

exports.createItem = createItem;
exports.getItem = getItem;
exports.updateItem = updateItem;
