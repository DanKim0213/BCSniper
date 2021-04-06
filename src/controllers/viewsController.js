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
  // try {
  //   const bitcoins = await axios({
  //     method: 'GET',
  //     url: 'https://api.blockchain.com/v3/exchange/tickers/'
  //   });
  //   res.status(200).render('overview', {
  //     title: 'Bitcoin Overview',
  //     bitcoins
  //   });
  // } catch (err) {
  //   next(err);
  // }
};

// TODO: user in req.user is undefined
exports.getSniper = async (req, res, next) => {
  try {
    // 1) Get the data, for the requested item
    const sniper = await Sniper.findById(req.user._id).populate({
      path: 'items',
      fields: 'symbol price maxPrice'
    });

    if (!sniper) {
      return next(new AppError('There is no items with the sniper.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('sniper', {
      title: `Sniper with $${sniper.money}`,
      sniper
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
