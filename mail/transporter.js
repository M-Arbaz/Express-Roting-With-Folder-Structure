const nodemailer = require('nodemailer');
let transporter =nodemailer.createTransport({
    host: 'mail.websuss.com',
    port: 465,
    secure:true,
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS
    }
});

module.exports = {transporter}