const mongoose = require('mongoose');

const sniperSchema = new mongoose.Schema(
  {
    money: {
      type: Number,
      default: 10000,
      validate: {
        validator: function (val) {
          return val >= 0;
        },
        message: `Money ({VALUE}) is not enough`
      }
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

sniperSchema.virtual('logs', {
  ref: 'Log',
  foreignField: 'sniper',
  localField: '_id'
});

const Sniper = mongoose.model('Sniper', sniperSchema);
module.exports = Sniper;
