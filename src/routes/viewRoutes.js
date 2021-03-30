const express = require('express');
const auctionCont = require('../controllers/viewsController');

const router = express.Router();

router.route('/').get(auctionCont.getAllBitcoinData);

router.route('/sniper').get().patch();

router.route('/sniper/:id').get().patch().delete();

router.route('/sniper/unreg').get().post();

module.exports = router;
