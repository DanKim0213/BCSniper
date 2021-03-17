const express = require('express');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router.route('/sniper').post(itemCont.createItem);

router
  .route('/sniper/item/:symbol')
  .get(itemCont.getItem)
  .patch(itemCont.updateItem)
  .delete(itemCont.deleteItem);

module.exports = router;
