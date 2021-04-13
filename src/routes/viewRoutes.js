const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.route('/sniper').get(authController.protect, viewsController.getSniper);
router.get(
  '/sniper/unreg',
  authController.protect,
  viewsController.getCandidate
);
router
  .route('/sniper/items/:symbol') // TODO: '/sniper/:symbol'
  .get(authController.protect, viewsController.getItem);
router.get(
  '/sniper/create/:symbolNprice',
  authController.protect,
  viewsController.getCreateItemForm
);
// router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
