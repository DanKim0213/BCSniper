const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), itemController.getAllItems)
  .post(authController.restrictTo('admin', 'user'), itemController.createItem);

// TODO: matchSniper as well as route('/within').get();
router.route('/within-a-week').get(itemController.aliasWithinAWeek);

router.use(authController.restrictTo('admin', 'user'));
router
  .route('/:id')
  .get(itemController.matchSniper, itemController.getItem)
  .patch(itemController.matchSniper, itemController.updateItem)
  .delete(itemController.matchSniper, itemController.deleteItem);

module.exports = router;
