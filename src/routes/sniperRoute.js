const express = require('express');
const sniperCont = require('../controllers/sniperController');
const itemCont = require('../controllers/itemController');

const router = express.Router();

router.route('/sniper').get(sniperCont.getSniperInfo).post(sniperCont.addItem);

router.route('/sniper/:symbol').get(itemCont.getItem);
// .patch(itemCont.updateItem);

module.exports = router;
