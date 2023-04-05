const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  name:String,
  emailid:String,
  password:String,
  img:{
    type:Object
  }
});
const User=mongoose.model('userinfo',blogSchema);
module.exports=User;