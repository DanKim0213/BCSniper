const express = require('express');
const sniperCont = require('../controllers/sniperController');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router
  .route('/sniper')
  .get(sniperCont.getAllSniperInfo)
  .post(itemCont.createTarget);

module.exports = router;
