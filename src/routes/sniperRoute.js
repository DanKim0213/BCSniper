const express = require('express');
const sniperCont = require('../controllers/sniperController');

const router = express.Router();

router
  .route('/:id')
  .get(sniperCont.getSniperInfo)
  .patch(sniperCont.updateSniper);

module.exports = router;
