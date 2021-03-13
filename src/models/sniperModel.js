const mongoose = require('mongoose');

const sniperSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
    select: false
  },
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Item'
      // TODO: give the max limit to 5
    }
  ]
});

const Sniper = mongoose.model('Sniper', sniperSchema);
module.exports = Sniper;
