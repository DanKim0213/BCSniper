const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), itemController.getAllItems)
  .post(authController.restrictTo('admin', 'user'), itemController.createItem);

router.route('/within-a-week').get(itemController.aliasWithinAWeek);
// TODO: route('/within').get();

router
  .route('/:id')
  .all(authController.restrictTo('admin', 'user'), itemController.matchSniper)
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
