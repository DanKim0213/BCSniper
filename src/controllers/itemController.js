const axios = require('axios');
const Item = require('../models/itemModel');

const createItem = async symbol => {
  const input = await axios.get(
    `https://api.blockchain.com/v3/exchange/tickers/${symbol}`
  );
  return await Item.create({
    name: symbol,
    price: input.data.price_24h * 1,
    maxPrice: input.data.price_24h * 1 + 100,
    status: 'joining'
  });
};

const getItem = async (req, res) => {
  try {
    const obj = await Item.findOne({ name: req.params.symbol });
    res.status(200).json(obj);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateItemPrice = async (req, res) => {
  try {
    const newData = await Item.findOneAndUpdate(
      { name: req.params.symbol },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createItem = createItem;
exports.getItem = getItem;
exports.updateItemPrice = updateItemPrice;
