const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/').post(itemController.createItem);

router
  .route('/:symbol')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
