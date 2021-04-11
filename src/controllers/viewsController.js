const Sniper = require('../models/sniperModel');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const AppError = require('../utils/appError');

// TODO: overview.js in public
exports.getOverview = (req, res, next) => {
  res.status(200).render('overview', {
    title: 'BCSniper Overview',
    message: 'Bitcoin Sniper Overview'
  });
};

exports.getSniper = async (req, res, next) => {
  try {
    // 1) Get the data, for the requested item
    const sniper = await Sniper.findById(req.user.sniper).populate({
      path: 'items',
      fields: 'symbol price minPrice maxPrice duration status'
    });

    if (!sniper) {
      return next(new AppError('There is no sniper with the user.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('sniper', {
      title: `Sniper with $${sniper.money}`,
      items: sniper.items
    });
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    // 1) Get the data, for the requested item
    const item = await Item.findOne({
      symbol: req.params.symbol,
      sniper: req.user.sniper._id
    });

    if (!item) {
      return next(new AppError('There is no item on the sniper.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('item', {
      title: `${req.params.symbol} Item`,
      item
    });
  } catch (err) {
    next(err);
  }
};

exports.getCandidate = async (req, res, next) => {
  try {
    // 1) Get the data, for the requested item
    const query = Item.find({ sniper: req.user.sniper._id });
    const items = await query.sort('symbol');

    if (!items) {
      return next(new AppError('There is no item!!!', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('candidate', {
      title: `Candidates for the next Item`,
      items
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreateForm = (req, res) => {
  res.status(200).render('create', {
    title: 'Create Item'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};
