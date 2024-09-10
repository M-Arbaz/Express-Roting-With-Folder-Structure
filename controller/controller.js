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
        

      if(tokenToDecode.message == "invalid signature"){
        res.status(498).json(tokenToDecode);
      }else{
        res.status(200).json(tokenToDecode);
      }
    
}

const buyerRegisterOtp = async (req,res)=>{
 const otpBuyer = await functionL.gerateBuyerOtp(req.body);
    res.json(otpBuyer);
}
const signUp = async (req,res)=>{
    const registerBuyer = await  functionL.registerBuyer(req.body);
    res.send(registerBuyer);
    
}
const login = async (req,res)=>{
  const {name, email, pass} = req.body;
  const info = await functionL.passDecrypt(pass);
  
  res.send(info)
}
module.exports = {getKey,postBody,getToken, decToken, getFun, signUp, login, buyerRegisterOtp};