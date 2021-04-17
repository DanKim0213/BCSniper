const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  money: Number,
  price: Number,
  trade: {
    type: String,
    enum: ['BUY', 'SELL']
  },
  symbol: String,
  status: {
    type: String,
    enum: ['JOINING', 'LOST', 'WON']
  },
  total: Number,
  sniper: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sniper',
    required: [true, 'Log must have its sniper.']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const log = mongoose.model('Log', logSchema);
module.exports = log;
