const express = require('express');
const sniperController = require('../controllers/sniperController');

const router = express.Router();

router
  .route('/:id')
  .get(sniperController.getSniperInfo)
  .patch(sniperController.updateSniper);

module.exports = router;
