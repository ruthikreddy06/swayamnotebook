const mongoose = require('mongoose');
const { Schema } = mongoose;
const userinfo=require('../modules/User');
const blogSchema = new Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userinfo"
  },
  Nameoftheauthor:String,
  Titleofblog:String,
  Content:[],
  Dateofpublishing:String,
  Blogthumbnail:{
    type:Object
  }
  
});
const User=mongoose.model('notesinfo',blogSchema);
module.exports=User;