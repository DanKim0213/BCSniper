const mongoose = require('mongoose');

const sniperSchema = new mongoose.Schema({
  money: {
    type: Number,
    default: 0
  },
  active: {
    // TODO: depends on items's length
    // if length === 0, active is false
    type: Boolean,
    default: false,
    select: false
  },
  items: [String]
  // TODO:
  // {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Item'
  // }
});

const Sniper = mongoose.model('Sniper', sniperSchema);
module.exports = Sniper;
