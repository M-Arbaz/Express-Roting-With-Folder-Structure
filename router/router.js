const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
router.route('/').get(controller.getFun);
router.route('/').post(controller.login);
router.route('/token').post(controller.getToken);
router.route('/verify').post(controller.decToken);
router.route('/signup').post(controller.signUp)
module.exports = router;