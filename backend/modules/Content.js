const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesinfo=require('../modules/Notes');
const blogSchema = new Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"notesinfo"
  },
  Content:[],
 
  
});
const User=mongoose.model('contentinfo',blogSchema);
module.exports=User;