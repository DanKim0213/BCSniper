const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: [true, 'No item name'],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  price: {
    type: Number,
    required: [true, 'An item must have price']
  },
  priceChangedAt: {
    type: Date,
    default: Date.now()
  },
  purchasedAt: Number,
  // duration: {
  //   type: Number,
  //   required: [true, 'How long will you hold this item?']
  // },
  maxPrice: {
    type: Number,
    required: [true, 'Please set the max price'],
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val > this.price;
      },
      message: `Max price ({VALUE}) must be set greater than the current price (${this.price})`
    }
  },
  minPrice: {
    type: Number,
    required: [true, 'Please set the min price'],
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Min price must be set smaller than the current price({VALUE})'
    }
  },
  status: {
    type: String,
    enum: ['joining', 'having', 'lost', 'sold']
    // need to set validation for status change
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
