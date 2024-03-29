const express = require('express');
const sniperController = require('../controllers/sniperController');
const authController = require('../controllers/authController');
const itemRouter = require('./itemRoutes');

const router = express.Router();

router.use('/items', itemRouter);

router.use(authController.protect);

// Restrict from ('admin', 'user') to ('admin')
router.use(authController.restrictTo('admin', 'user'));
router
  .route('/me')
  .get(sniperController.matchUser, sniperController.getSniper)
  .post(sniperController.registerSniper)
  .patch(sniperController.matchUser, sniperController.updateSniper)
  .delete(sniperController.matchUser, sniperController.unregisterSniper);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(sniperController.getAllSniper)
  .post(sniperController.createSniper);
// from '/me' to '/:id'
router
  .route('/:id')
  .get(sniperController.getSniper)
  .patch(sniperController.updateSniper)
  .delete(sniperController.deleteSniper);

module.exports = router;
