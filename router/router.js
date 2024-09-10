const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
router.route('/').get(controller.getFun);
router.route('/').post(controller.login);
router.route('/token').post(controller.getToken);
router.route('/verify').post(controller.decToken);
router.route('/otp').post(controller.buyerRegisterOtp);
module.exports = router;