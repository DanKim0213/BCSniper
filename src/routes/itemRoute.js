const express = require('express');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router.route('/sniper').post(itemCont.createItem);

router
  .route('/sniper/:symbol')
  .get(itemCont.getItem)
  .patch(itemCont.updateItem);

module.exports = router;
