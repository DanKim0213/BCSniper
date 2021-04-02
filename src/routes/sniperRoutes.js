const express = require('express');
const sniperController = require('../controllers/sniperController');
const authController = require('../controllers/authController');
const itemRouter = require('./itemRoutes');

const router = express.Router();

router.use('/items', itemRouter);

router.use(authController.protect);

router
  .route('/')
  .get(sniperController.getMe)
  .post(sniperController.createSniper)
  .patch(sniperController.updateMe);

// we forbid directly approaching to sniper by Id
router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(sniperController.getSniper)
  .patch(sniperController.updateSniper);

module.exports = router;
