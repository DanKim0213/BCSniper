const axios = require('axios');
const Item = require('../models/itemModel');
const Sniper = require('../models/sniperModel');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);

exports.aliasWithinAWeek = async (req, res, next) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const filter = Item.find({
      sniper: req.user.sniper,
      duration: { $lte: date }
    });

    req.query.sort = 'duration,-price';
    req.query.fields = 'symbol,price,duration';
    const features = new APIFeatures(filter, req.query).sort().limitFields();
    const data = await features.query;

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.matchSniper = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    // req.user.sniper._id is Object while id is String
    if (item.sniper.toString() !== req.user.sniper.id) {
      return next(
        new AppError('You are not allowed to access to the item', 403)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.watchItem = async (req, res, next) => {
  try {
    const bitcoin = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${req.body.symbol}`
    });

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        price: bitcoin.data.price_24h,
        priceChangedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) return new AppError('No item found by the id', 404);

    const status = item.purchasedAt < item.price ? 'WINNING' : 'LOSING';
    res.status(200).json({
      status: 'success',
      data: {
        item,
        status
      }
    });
  } catch (err) {
    // symbol could be incorrect from blockchain.com
    next(err);
  }
};

exports.getSniperItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({
      sniper: req.user.sniper,
      symbol: req.params.symbol
    });

    // if (!item) return new AppError('No item found by the symbol!', 404);

    res.status(200).json({
      status: 'success',
      data: {
        item
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createSniperItem = async (req, res, next) => {
  try {
    const coin = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${req.body.symbol}`
    });

    const item = await Item.create({
      sniper: req.user.sniper,
      price: coin.data.price_24h,
      symbol: req.body.symbol,
      duration: Date.now() + req.body.duration * 24 * 60 * 60 * 1000,
      maxPrice: req.body.maxPrice,
      minPrice: req.body.minPrice
    });

    if (!item) return new AppError('could not create Item', 403);

    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    next(err);
  }
};

exports.sellSniperItem = async (req, res, next) => {
  try {
    const coin = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${req.params.symbol}`
    });

    const soldItem = await Item.findOneAndDelete({
      sniper: req.user.sniper,
      symbol: req.params.symbol
    });

    if (!soldItem) return new AppError('could not find the item', 403);

    const { money } = req.user.sniper;
    const profit = coin.data.price_24h - soldItem.purchasedAt;
    const sniper = await Sniper.findByIdAndUpdate(
      soldItem.sniper,
      {
        money: money + profit
      },
      {
        new: true,
        runValidators: true
      }
    );
    req.user.sniper.money = sniper.money;

    const status = profit > 0 ? 'WON' : 'LOST';
    res.status(200).json({
      status: 'success',
      data: { status }
    });
  } catch (err) {
    next(err);
  }
};
