import React,{useEffect, useState} from 'react'



export default function BuyerSignup() {
   
  
    const [obj, setObj] = useState({});

   const  handleValueChange =(e)=>{
     return e.target.value;
   }
    const handleSubmitBuyer =(e)=>{
        e.preventDefault();
        if(obj.lastName ){
        
               }else{
             
               }
       setObj(null);
    }
  return (
   
  <>
<form onSubmit={handleSubmitBuyer}>
<input type="text" onChange={(e)=>{setObj(()=>({
    name:handleValueChange(e)
}))}} />
<input type="text" onChange={(e)=>{setObj(()=>({
    lastName:handleValueChange(e)
}))}} />
<input type='submit'/>
</form>

  </>
  )
}
