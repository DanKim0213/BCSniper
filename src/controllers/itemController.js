const Item = require('../models/itemModel');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
// exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);

// must be loosley coupled
// TODO: make createOne consistent: Item depends on Sniper
exports.createItem = async (req, res, next) => {
  try {
    const input = { ...req.body, sniper: req.user.sniper };
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
    if (!item.sniper === req.user.sniper) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
