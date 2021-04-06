const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router
  .route('/sniper') // TODO: user in req.user is undefined
  .get(authController.isLoggedIn, viewsController.getSniper);
router
  .route('/sniper/:symbol')
  .get(authController.isLoggedIn, viewsController.getItem);
// router.route('/sniper/unreg').get();
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
