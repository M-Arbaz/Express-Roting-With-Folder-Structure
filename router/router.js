const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
router.route('/').get(controller.getFun);
router.route('/').post(controller.postBody);
router.route('/token').post(controller.getToken);
router.route('/verify').post(controller.decToken)
module.exports = router;