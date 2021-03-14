const Item = require('../models/itemModel');

const getItem = async (req, res) => {
  const obj = await Item.findOne({ name: req.params.symbol });
  res.status(200).json(obj);
  // res.send('OK');
};

// TODO: I didn't set where the val comes from
const updateItemPrice = async (req, res, next, val) => {
  await Item.findOneAndUpdate(
    { name: req.params.symbol },
    { price: val },
    {
      new: true,
      runValidators: true
    }
  );
};

exports.getItem = getItem;
exports.updateItemPrice = updateItemPrice;
