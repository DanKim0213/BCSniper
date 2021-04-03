const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/sniper').post(itemController.createItem);

router
  .route('/:id/item/:symbol')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
