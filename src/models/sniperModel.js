const mongoose = require('mongoose');

const sniperSchema = new mongoose.Schema(
  {
    money: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// For Parent Referencing, Virtual populate which is not saved on DB
sniperSchema.virtual('items', {
  ref: 'Item',
  foreignField: 'sniper',
  localField: '_id'
});

const Sniper = mongoose.model('Sniper', sniperSchema);
module.exports = Sniper;
