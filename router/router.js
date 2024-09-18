const express = require('express');
const router = express.Router();
const key = process.env.KEY;
const upload = require('../multerUpload/multer.js')
const controller = require('../controller/controller');
router.route('/').get(controller.sendFile);
router.route('/token').post(controller.getToken);
router.route('/verify').post(controller.decToken);
router.route('/buyer/otp_buyer').post(controller.buyerRegisterOtp);
router.route('/buyer/register_buyer').post(controller.signUpBuyer);
router.route('/buyer/login_buyer').post(controller.loginBuyer);
// this route will send reset link on email
router.route('/buyer/pass_update_email').post(controller.buyerPassUpdate);
// this route will update password of buyer
router.route('/buyer/pass_update_id').post(controller.resetBuyerPass);
// file uploading sys
router.route('/upload').post(upload.upload.single(key),controller.fileUpload)
module.exports = router;