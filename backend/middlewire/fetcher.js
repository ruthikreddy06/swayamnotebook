var jwt = require('jsonwebtoken')
const express = require('express')
const routes = express()
const token1="ruthikreddy";
const fetcher=(req,res,next)=>{
    const token=req.header("auth-token");
   try{
    if(!token){
        return res.status(404).json({error:"no token"});
    }
    else{
    const data=jwt.verify(token,token1);
    
     req.user=data.user;
     console.log(req.user);
    }
    next();
   }
   catch(error){
    res.json({error:"server error"});
   }

}
module.exports=fetcher;