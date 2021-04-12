const Item = require('../models/itemModel');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
// exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);

exports.createItem = async (req, res, next) => {
  try {
    const input = { ...req.body, sniper: req.user.sniper };
    input.duration = Date.now() + req.body.duration * 24 * 60 * 60 * 1000;
    const data = await Item.create({
      symbol: input.symbol,
      price: input.price,
      duration: input.duration,
      maxPrice: input.maxPrice,
      minPrice: input.minPrice,
      sniper: input.sniper
    });

    res.status(201).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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
