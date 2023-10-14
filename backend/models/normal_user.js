const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const normal_user = new Schema({
   email:{
    require:true,
     type:String,
   },
   password:{
    require:true,
     type:String,
   },
 firstName:String,
 lastName:String,
 dob:String,
 images:String,
 country:String,
 profileBio:String,
 languages:Array,
 sponsoredHours:Number,
 paymentInfo:String,
 onboardDate:String,
 hours:Number,
 valid:String,
});

const normal_users = mongoose.model('normal_users', normal_user);

module.exports = normal_users;