const express = require('express');
const auctionCont = require('../controllers/auctionPageController');

const router = express.Router();

router.route('/').get(auctionCont.getAllBitcoinData);

module.exports = router;
