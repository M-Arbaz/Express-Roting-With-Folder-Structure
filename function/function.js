const key = process.env.KEY;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// models import
const schema = require('../models/schema');
const transport = require('../mail/transporter.js');
const query = (param)=>{
  return { $or: [{ email: param }, { name: param }]}
};


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

// generate token
const generateToken = async (obj) => {
    let split_token;

    const token = await new Promise((resolve, reject) => {
        jwt.sign(obj, key, (err, token) => {
            if (err) {
                console.log("err", err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

    split_token = splitToken(token);
    return split_token;
};
// decode token
const decodeToken = async (a, b, c) => {
    const MergeToken = `${a}.${b}.${c}`;
    let result;
   await jwt.verify(MergeToken, key, (err, info) => {
        if (err) {
            return result = err;
        } else {

            return result = info;
        }
    })
    return result;

}

// encrypt password
const passEncrypt = async (pass) => {
    try {
        // Use await to get the hash value directly
        const hash = await bcrypt.hash(pass, saltRounds);
        console.log(hash);
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
const Exsist = async (email,model) => {
      const modl = schema[model];
     
    const avail = await modl.find({ email: email });
    if (avail.length === 0) {
        return false;
    } else {
        return true;
    }
}

const gerateBuyerOtp = async (obj) => {
    const checkAvail = await Exsist(obj.email,"buyerModel");
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
    const checkAvail = await Exsist(obj.email,"buyerModel");
    if (checkAvail) {
        return { message: "user exsist" };
    } else {
        const encPass = await passEncrypt(obj.pass);
        obj.pass = encPass;
        obj.message = "success";
        const x = await schema.buyerModel.create(obj);  
        return x;
    }
}
// login buyer
const loginBuyer = async (obj) => {
    const loginBuyers = await schema.buyerModel.find(query(obj.param));
    if (!loginBuyers || loginBuyers.length === 0) {
      return { message: "user not found", status: 404 };
    }
    for (const loginBuyer of loginBuyers) {
      const checkPass = await passDecrypt(obj.pass, loginBuyer.pass);
      if (checkPass) {
        const sendData = loginBuyer.toObject();
        const token = await generateToken(sendData);
        token.buyer_id = sendData._id;
        token.message = "success";
        return token;
      }
    }
  
    // If no passwords matched, return incorrect password response
    return { message: "password incorrect", status: 401 };
  };
  
// update buyer pass
// this will send mail to user email if user exsist
const buyerPassUpdate = async (obj)=>{ 
    const checkUser = await Exsist(obj.email,"buyerModel")
    if(checkUser){
    const found_id = await schema.buyerModel.findOne({email:obj.email});
    const rnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const resetLink = `https://${process.env.PLATFORM_NAME}/update/pass/user/buyer?rotp=${found_id._id}&chksoun=${rnum}`
    
        const buyerEmailResetLink = await transport.transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: obj.email,
            subject: `Reset Your Password`,
            html: ` your rest link: ${resetLink}`
        })
        if (buyerEmailResetLink.accepted) {
            return { message:"success",user_id:found_id._id , status:200 };
        } else {
            return {message: "email sending failed", status:500 };
        }

    }else{
        return {message:"user not found"};
    }
}
const resetBuyerPass = async (obj) =>{

    const updateNewPass = await passEncrypt(obj.pass)
    try{
        const newPass = await schema.buyerModel
        .findByIdAndUpdate(obj._id,{pass:updateNewPass});
        return  {message:"success",status:200} ;
    } catch (error){
        console.error("error");
        return {message:"error",error:error,status:400}
    }

}

// Do Some multer logic
// upload file return link 
const  fileUpload = (body,file) =>{
console.log(body,file);
}
module.exports = {
     generateToken,
    decodeToken, passEncrypt, passDecrypt, registerBuyer,
    gerateBuyerOtp, loginBuyer, buyerPassUpdate, resetBuyerPass, fileUpload
};