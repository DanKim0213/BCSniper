const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), itemController.getAllItems)
  .post(itemController.createItem);

router.route('/within-a-week').get(itemController.aliasWithinAWeek);

router
  .route('/:id')
  .all(authController.restrictTo('admin', 'user'))
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
