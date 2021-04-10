const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.route('/sniper').get(authController.protect, viewsController.getSniper);
router
  .route('/sniper/items/:symbol')
  .get(authController.protect, viewsController.getItem);
router
  .route('/sniper/unreg')
  .get(authController.protect, viewsController.getCandidate);
router.get('/create', authController.protect, viewsController.getCreateForm);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
