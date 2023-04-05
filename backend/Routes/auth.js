const express = require('express')
const routes = express()
const userinfo=require('../modules/User');
const bcrypt = require('bcrypt');
const fetcher=require('../middlewire/fetcher');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { findById } = require('../modules/User');
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dw6dxfowz', 
  api_key: '414582118965658', 
  api_secret: '8HGXjVy184TdWfDGgvmSSoPLYAE' 
});
routes.post(
    '/',[
    body('emailid').isEmail(),
    body('password').isLength({ min: 5 }),body('name').isLength({min:3})],
    async (req, res) => {
      let s=false

      const file=req.body.img;
      console.log(file);
      const i= await cloudinary.uploader.upload(file,{
          
      });
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(),success:s});
      }
     let user=await userinfo.findOne({emailid:req.body.emailid});
     if(user){
        return res.status(404).json({error:"user with is email already exists",success:s});
     }
     const salt = await bcrypt.genSaltSync(10);
     const hash = await bcrypt.hashSync(req.body.password, salt);
      user=await userinfo.create({
        name: req.body.name,
        password: hash,
        emailid:req.body.emailid,
        img:i
      })
      const data={
        user:{
          id:user.id
        }
      }
      var token = jwt.sign(data,"ruthikreddy");
      s=true

      res.send({token:token,success:s});
    }
  );
  routes.post(
    '/login',[
    body('emailid').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        s=false
        return res.status(400).json({errors: errors.array()});
      }
     let user=await userinfo.findOne({emailid:req.body.emailid});
     if(user){
      if(bcrypt.compareSync(req.body.password,user.password)){
            s=true
      }
      else{
           s=false;
        return res.status(404).json({errors:"incorrect password"});
      }
     }
     else{
      s=false
      return res.status(500).json({errors:"user does not exists"});
     }
     const data={
      user:{
        id:user.id
      }
    }
    var token = jwt.sign(data,"ruthikreddy");
        res.json({token:token,success:s});
    }
  );
  routes.post("/getuser",fetcher,async(req,res)=>{
         try{
          const data=await userinfo.findById(req.user.id).select("-password");
         res.json({data});
         }catch{
          res.json({error:"server error"})
         }
  })

module.exports=routes