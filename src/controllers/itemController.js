const Item = require('../models/itemModel');
const AppError = require('../utils/appError');

exports.createItem = async (req, res, next) => {
  try {
    const doc = await Item.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
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
exports.updateItem = async (req, res, next) => {
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

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ symbol: req.params.symbol });
    if (!item) {
      return next(new AppError(`No item found with that symbol.`, 404));
    }

    await Item.deleteOne({ _id: item._id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
