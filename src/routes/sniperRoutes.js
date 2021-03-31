const express = require('express');
const sniperController = require('../controllers/sniperController');
const itemRouter = require('./itemRoutes');

const router = express.Router();

// TODO: either authorize or use token
router.use('/:sniperId/items', itemRouter);

router
  .route('/:id')
  .get(sniperController.getSniper)
  .patch(sniperController.updateSniper);

module.exports = router;
