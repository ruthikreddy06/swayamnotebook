const express = require('express')
const routes = express()
const notesinfo=require('../modules/Notes');
const fetcher=require('../middlewire/fetcher');
const { body, validationResult } = require('express-validator');
const { json } = require('express');
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dw6dxfowz', 
  api_key: '414582118965658', 
  api_secret: '8HGXjVy184TdWfDGgvmSSoPLYAE' 
});
routes.post('/',fetcher,[body('content').isLength({min:0})],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(),success:false});
    }
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    const file=req.body.Blogthumbnail;
      console.log(file);
      const eBlogthumbnail= await cloudinary.uploader.upload(file,{
          
      });
   const  user=await notesinfo.create({              //this is adding the data
        userid: req.user.id,
        Nameoftheauthor:req.body.Nameoftheauthor,
  Titleofblog:req.body.Titleofblog,
  Dateofpublishing:formattedToday,
  Blogthumbnail:eBlogthumbnail
      })
      res.send({user,success:true});
})
routes.post('/fetchdata',fetcher,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                            //this is for fetching the data from the database
      return res.status(400).json({errors: errors.array()});
    }
    const data=await notesinfo.find({userid:req.user.id});
      res.send(data);
})
routes.put('/updatedata/:id',fetcher,[ body('Nameofauthor').isLength({ min: 0}),body('Content').isLength({min:0}), body('Titleofblog').isLength({ min: 0})],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {                            //this is for updateing the data in  the database
      return res.status(400).json({errors: errors.array()});
    }
    let newdata={};
    if(req.body.Nameoftheauthor){
        newdata.Nameoftheauthor=req.body.Nameoftheauthor;
    }
    if(req.body.Titleofblog){
        newdata.Titleofblog=req.body.Titleofblog;
    }
    if(req.body.Content){
        newdata.Content=req.body.Content;
    }
    if(req.body.Dateofpublishing){
      newdata.Dateofpublishing=req.body.Dateofpublishing;
  }
    let data=await notesinfo.findById(req.params.id)
    if(!data){
        return res.status(404).json({error:"id not found bro"});
    }
    data=await notesinfo.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})
    res.send({data});

    }
)
routes.delete('/deletedata/:id',fetcher,async (req,res)=>{

  try{
    let data=await notesinfo.findById(req.params.id)
    if(!data){
        return res.status(404).json({error:"id not found bro",success:false});
    }
    data=await notesinfo.findByIdAndDelete(req.params.id)
    res.send({msg:"data deleted",data,success:true});
  }catch(error){
    return json({error:"server error",success:false});
  }

    }
)
routes.put('/addcontent/:id',[ body('heading').isLength({ min: 0}),body('subheading').isLength({min:0}), body('quote').isLength({ min: 0})],async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {                            //this is for updateing the data in  the database
    return res.status(400).json({errors: errors.array()});
  }
  let newdata={Content:[]};
  const s="https://www.shutterstock.com/image-vector/user-account-circle-profile-line-260nw-272552858.jpg"
  if(req.body.file!==s){
    const file=req.body.file;
    const eBlogthumbnail= await cloudinary.uploader.upload(file,{
        
    });
    newdata.Content={tagcontent:"image",text:eBlogthumbnail};
  }
 else if(req.body.heading){
      newdata.Content={tagcontent:req.body.tag,text:req.body.heading};
      
  }
 else if(req.body.subheading){
  newdata.Content={tagcontent:req.body.tag,text:req.body.subheading};
  }
 else if(req.body.quote){
  newdata.Content={tagcontent:req.body.tag,text:req.body.quote};
  }
 else if(req.body.para){
  newdata.Content={tagcontent:req.body.tag,text:req.body.para};
}
  let data=await notesinfo.findById(req.params.id)
  if(!data){
      return res.status(404).json({error:"id not found bro"});
  }
  data=await notesinfo.findByIdAndUpdate(req.params.id,{$push:newdata},{new:true})
  res.send({data});

  }
)

module.exports=routes