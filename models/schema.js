const mongoose = require('mongoose');

const buyer = new mongoose.Schema({}, { strict: false });

const buyerModel = mongoose.model("buyer",buyer);

module.exports = {buyerModel}