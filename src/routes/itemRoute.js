const express = require('express');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router.route('/sniper/:id').get(itemCont.getItemInfo);

module.exports = router;
