/* eslint-disable no-plusplus */
const axios = require('axios');
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
    const sniper = await Sniper.findById(req.user.sniper).populate({
      path: 'items',
      fields: 'symbol price minPrice maxPrice duration status'
    });

    const bitcoins = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers`
    });

    // 1-1) sort items
    // TODO: bad performance!!! over 2 sec. You'd rather send sniper items and filter only string.
    const items = [...sniper.items].map(el => el.symbol).sort();
    const all = bitcoins.data
      .filter(el => el.symbol.endsWith('-USD'))
      .sort((a, b) => {
        const nameA = a.symbol;
        const nameB = b.symbol;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    console.log(all);
    // const all = [ 'ADA-USD', 'BCH-USD', 'BNB-USD', 'BTC-USD', 'BTT-USD', 'BUSD-USD', 'DOGE-USD', 'DOT-USD', 'EOS-USD', 'ETH-USD', 'LINK-USD', 'LTC-USD', 'QTUM-USD', 'TRX-USD', 'USDT-USD', 'WIN-USD', 'XLM-USD', 'XRP-USD' ];

    // 1-2) filter items
    let candidates = [];
    if (items.length === 0) candidates = all;
    for (let i = 0, j = 0; items.length !== 0 && i < all.length; i++) {
      if (j >= items.length || all[i].symbol !== items[j])
        candidates.push(all[i]);
      else j++;
    }

    if (!sniper) {
      return next(new AppError('There is no sniper!!!', 404));
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
