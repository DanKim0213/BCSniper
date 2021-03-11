const express = require('express');
const auctionCont = require('../controllers/auctionController');

const router = express.Router();

router.route('/auction').get(auctionCont.getAllBitcoinData);

module.exports = router;
