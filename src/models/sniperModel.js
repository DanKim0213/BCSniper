const mongoose = require('mongoose');

const sniperSchema = new mongoose.Schema({
  money: {
    type: Number,
    default: 0
  },
  active: {
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
