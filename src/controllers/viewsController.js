/* eslint-disable no-plusplus */
const axios = require('axios');
const Sniper = require('../models/sniperModel');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const AppError = require('../utils/appError');

exports.getOverview = (req, res, next) => {
  res.status(200).render('home', {
    title: 'BCSniper Home',
    message: 'Bitcoin Sniper Home'
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

    // TODO: if there is no item??

    const coins = await axios({
      method: 'GET',
      url: 'https://api.blockchain.com/v3/exchange/tickers'
    });
    const all = coins.data
      .filter(el => el.symbol.endsWith('-USD'))
      .sort((a, b) => {
        // symbol is unique
        if (a.symbol < b.symbol) return -1;
        return 1;
      });

    let candidates = [];
    if (items.length === 0) candidates = all;
    for (let i = 0, j = 0; items.length !== 0 && i < all.length; i++) {
      if (j >= items.length || all[i].symbol !== items[j].symbol)
        candidates.push(all[i]);
      else j++;
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('candidate', {
      title: `Candidates for the next Item`,
      candidates
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
