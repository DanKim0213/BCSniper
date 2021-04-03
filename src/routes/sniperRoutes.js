const express = require('express');
const sniperController = require('../controllers/sniperController');
const authController = require('../controllers/authController');
const itemRouter = require('./itemRoutes');

const router = express.Router();

router.use('/items', itemRouter);

router.use(authController.protect);

router
  .route('/')
  .all(authController.restrictTo('admin'))
  .get(sniperController.getAllSniper)
  .post(sniperController.createSniper);

router
  .route('/:id')
  .all(authController.restrictTo('admin'))
  .get(sniperController.getSniper)
  .patch(sniperController.updateSniper)
  .delete(sniperController.deleteSniper);

router
  .route('/me')
  .post(
    authController.restrictTo('admin', 'user'),
    sniperController.matchUser,
    sniperController.createSniper
  );

router
  .route('/me/:id')
  .all(authController.restrictTo('admin', 'user'), sniperController.matchUser)
  .get(sniperController.getSniper)
  .patch(sniperController.updateSniper)
  .delete(sniperController.removeSniperRef);

module.exports = router;
