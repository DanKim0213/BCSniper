const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: [true, 'No item name']
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
  purchasedAt: {
    // TODO: this doesn't work
    type: Number,
    default: this.price
  },
  duration: {
    type: Date,
    required: [true, 'How long will you hold this item?']
  },
  maxPrice: {
    type: Number,
    required: [true, 'Please set the max price'],
    validate: {
      validator: function (val) {
        return val > this.price;
      },
      message: `Max price ({VALUE}) must be set greater than the current price`
    }
  },
  minPrice: {
    type: Number,
    default: this.price,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: `Min price ({VALUE}) must be set smaller than the current price`
    }
  },
  status: {
    type: String,
    enum: ['JOINING', 'LOSING', 'WINNING', 'LOST', 'WON']
  },
  sniper: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sniper',
    required: [true, 'Item must belong to a sniper.']
  }
  // TODO: incPercent
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
