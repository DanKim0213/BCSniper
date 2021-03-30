const Item = require('../models/itemModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.getAllSniper = factory.getAll(Item);
exports.getSniper = factory.getOne(Item);
exports.createSniper = factory.createOne(Item);
exports.updateSniper = factory.updateOne(Item);
exports.deleteSniper = factory.deleteOne(Item);

// duration === Date.now() + days
// GET /items/:duration
exports.getItemsWithin = async (req, res, next) => {
  try {
    const items = Item.find({ duration: { $lte: req.params.duration } });

    if (!items) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Nothing to match the duration... '
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        items
      }
    });
  } catch (err) {
    next(err);
  }
};
