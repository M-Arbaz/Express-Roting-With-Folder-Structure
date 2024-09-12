const functionL = require('../function/function')

const getFun =(req,res)=>{
  res.status(200).json({message:"Server Running perfectly"})
}


const getToken = async(req,res)=>{
 
    const token = await functionL.generateToken(req.body);
    res.send(token);
}
const decToken = async (req,res)=>{
       const {tokenPart1,tokenPart2,tokenPart3} = req.body;
    const tokenToDecode = await functionL.decodeToken(tokenPart1,tokenPart2,tokenPart3);
        

      if(tokenToDecode.message == "invalid signature" || tokenToDecode._id == undefined){
        res.status(498).json(tokenToDecode);
      }else{
        res.status(200).json(tokenToDecode);
      }
    
}

const buyerRegisterOtp = async (req,res)=>{
 const otpBuyer = await functionL.gerateBuyerOtp(req.body);
    res.json(otpBuyer);
}
const signUpBuyer = async (req,res)=>{
    const registerBuyer = await  functionL.registerBuyer(req.body);
    res.json(registerBuyer);
    
}
const loginBuyer = async (req,res)=>{
  const info = await functionL.loginBuyer(req.body);
  res.status(info.status ? info.status : 200).header('Authorization', `Bearer ${info}`).json(info);
}
// this will send mail to email
const buyerPassUpdate = async (req,res)=>{
  const updateBuyerPassEmailLink = await functionL.buyerPassUpdate(req.body);
 res.status(updateBuyerPassEmailLink.status ? updateBuyerPassEmailLink.status : 400).json(updateBuyerPassEmailLink)
}
//  this will update buyer pAss
const resetBuyerPass = async (req,res)=>{
  const resetBuyerPass = await functionL.resetBuyerPass(req.body);
  res.status(resetBuyerPass.status ? resetBuyerPass.status : 400 ).json(resetBuyerPass)
}
// multer logic 
const fileUpload = async (req,res)=>{
  console.log(req.files)
  res.send(req.files)
}

module.exports = {getToken, decToken, getFun,
   signUpBuyer, loginBuyer, buyerRegisterOtp, buyerPassUpdate,
   resetBuyerPass, fileUpload};