const key = process.env.KEY;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// models import
const schema = require('../models/schema');
const transport = require('../mail/transporter.js')
const returnKEy = () => {
    return key;
}
const returnSameBody = (obj) => {
    const x = obj;
    x.state = true;
    return x;
}

//  spiliting token Logic Here
function splitToken(token) {
    const parts = token.split('.');
    if (parts.length === 3) {
        const part1 = parts[0];
        const part2 = parts[1];
        const part3 = parts[2];
        return {
            tokenPart1: part1,
            tokenPart2: part2,
            tokenPart3: part3
        };
    } else {
        throw new Error('Invalid token format');
    }
}


const generateToken = async (obj) => {
    let split_token;
    await jwt.sign(obj, key, (err, token) => {
        if (err) {
            console.log("err")
        } else {
            split_token = splitToken(token);
        }
    });

    return split_token;
}

const decodeToken = async (a, b, c) => {
    const MergeToken = `${a}.${b}.${c}`;
    let result;
    jwt.verify(MergeToken, key, (err, info) => {
        if (err) {
            return result = err;
        } else {

            return result = info;
        }
    })
    return result;

}


const passEncrypt = async (pass) => {
    try {
        // Use await to get the hash value directly
        const hash = await bcrypt.hash(pass, saltRounds);
        return hash;
    } catch (err) {
        console.error("Error in bcrypt hashing:", err);
        throw err; // Optional: Re-throw the error if you want to handle it further up
    }
}
const passDecrypt = async (pass, hash) => {

    const passCheck = await bcrypt.compare(pass, hash);
    return passCheck;
}

// Check Buyer Email exsist
const buyerExsist = async (email) => {

    const avail = await schema.buyerModel.find({ email: email })
    if (avail.length === 0) {
        return false;
    } else {
        return true;
    }
}

const gerateBuyerOtp = async (obj) => {
    const checkAvail = await buyerExsist(obj.email);
    if (checkAvail) {
        return { message: "user exsist" };
    } else {
        const rnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        const buyerOtpSend = await transport.transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: obj.email,
            subject: `Verify Your OTP: ${rnum}`,
            html: `please verify`
        })

        if (buyerOtpSend.accepted) {
            return { otp: rnum, email: obj.email };
        } else {
            return "email sending failed"
        }



    }
}
// Register Buyer

const registerBuyer = async (obj) => {
    const checkAvail = await buyerExsist(obj.email);
    if (checkAvail) {
        return { message: "user exsist" };
    } else {
        const encPass = await passEncrypt(obj.pass);
        obj.pass = encPass;
        const x = await schema.buyerModel.create(obj);
        x.message = "user created"
        return x;
    }


}
module.exports = {
    returnKEy, returnSameBody, generateToken,
    decodeToken, passEncrypt, passDecrypt, registerBuyer,
    gerateBuyerOtp
};