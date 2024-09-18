const mongoose = require('mongoose');

const buyer = new mongoose.Schema({

}, { strict: false });
const seller = new mongoose.Schema({

}, { strict: false });
const buyerModel = mongoose.model("buyer",buyer);
const sellerModel = mongoose.model("seller",seller);
module.exports = {buyerModel,sellerModel};