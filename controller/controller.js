const functionL = require('../function/function')


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
module.exports = {getKey,postBody,getToken, decToken};