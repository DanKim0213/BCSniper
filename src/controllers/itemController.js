const Item = require('../models/itemModel');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
// exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);

// TODO: authorize required
exports.createItem = async (req, res, next) => {
  try {
    const input = { ...req.body };
    const date = new Date();
    date.setDate(date.getDate() + req.body.duration);
    input.duration = date;

    const data = await Item.create(input);

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
