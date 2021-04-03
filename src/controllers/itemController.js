/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const Item = require('../models/itemModel');
const Sniper = require('../models/sniperModel');
const AppError = require('../utils/appError');

const createItem = async (req, res, next) => {
  try {
    // 1) create Item
    const input = await axios.get(
      `https://api.blockchain.com/v3/exchange/tickers/${req.body.symbol}`
    );
    const item = await Item.create({
      symbol: req.body.symbol,
      price: input.data.price_24h,
      maxPrice: input.data.price_24h + 100,
      minPrice: input.data.price_24h - 50,
      status: 'joining'
    });

    // 2) register Item to Sniper
    let sniper = await Sniper.findById(process.env.SNIPERID);
    const itemId = item._id;
    console.log('sniper item array is ', sniper.items, 'item id is ', itemId);
    sniper = await Sniper.findByIdAndUpdate(
      process.env.SNIPERID,
      { $push: { items: itemId } },
      { new: true }
    );

    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    next(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ symbol: req.params.symbol });
    if (!item) {
      return next(new AppError(`No item found with that symbol.`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    next(err);
  }
};

// TODO: without queries
const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ symbol: req.params.symbol });
    if (!item) {
      return next(new AppError(`No item found with that symbol.`, 404));
    }
    if (req.query.target === 'max') {
      if (req.body.maxPrice > item.price) {
        const newData = await Item.update(
          { symbol: req.params.symbol },
          { maxPrice: req.body.maxPrice }
        );
        return res.status(201).json(newData);
      }
      throw new Error('The max price is less than or equal to the price');
    }
    if (req.query.target === 'min') {
      if (req.body.minPrice < item.price) {
        const newData = await Item.update(
          { symbol: req.params.symbol },
          { minPrice: req.body.minPrice }
        );
        return res.status(201).json(newData);
      }
      throw new Error('The max price is less than or equal to the price');
    }
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    // 1) unregister Item from Sniper
    const sniper = await Sniper.findById(process.env.SNIPERID);
    const item = await Item.findOne({ symbol: req.params.symbol });
    if (!item) {
      return next(new AppError(`No item found with that symbol.`, 404));
    }
    await sniper.update({ $pull: { items: item._id } });
    console.log(item._id);

    // 2) delete Item
    await Item.deleteOne({ _id: item._id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

exports.createItem = createItem;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
