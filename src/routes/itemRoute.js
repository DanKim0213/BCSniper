const express = require('express');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router
  .route('/sniper/:symbol')
  .get(itemCont.getItem)
  .patch(itemCont.updateItemPrice);

module.exports = router;
