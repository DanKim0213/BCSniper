const express = require('express');
const itemController = require('../controllers/itemController');
// const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').post(itemController.createItem);

router.route('/within-a-week').get(itemController.aliasWithinAWeek);

router.route('/').get(itemController.getAllItems);

router
  .route('/:id')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
