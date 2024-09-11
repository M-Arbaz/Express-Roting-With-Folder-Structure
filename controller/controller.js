const functionL = require('../function/function')

const getFun =(req,res)=>{
  res.status(200).json({message:"Server Running perfectly"})
}
const getKey =(req,res)=>{
 return  res.send(functionL.returnKEy());
}
const postBody = async (req,res)=>{
    const result = await functionL.returnSameBody(req.body)
    res.send(result);
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
  res.status(info.status ? info.status : 200).json(info);
}
const buyerPassUpdate = async (req,res)=>{
  const updateBuyerPass = await functionL.buyerPassUpdate(req.body);
  console.log(req.body);
}
module.exports = {getKey,postBody,getToken, decToken, getFun,
   signUpBuyer, loginBuyer, buyerRegisterOtp, buyerPassUpdate};