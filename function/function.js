const key = process.env.KEY ;
const jwt = require('jsonwebtoken');
const returnKEy =()=>{
    return key;
}
const returnSameBody =(obj)=>{
    const x = obj;
    x.state = true;
  return x ;
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


const generateToken = async (obj)=> {
    
   const token =  await jwt.sign(obj,key);
  const split_token = splitToken(token);
   
   return split_token ;
} 

const decodeToken = async (a,b,c)=>{
    const MergeToken = `${a}.${b}.${c}`
    let result;
      jwt.verify(MergeToken, key ,(err,info)=>{
        if (err){
            return result = err;
        }else{
            
            return result = info;
        }
     })
     return  result;

}


module.exports = {returnKEy, returnSameBody, generateToken, decodeToken};