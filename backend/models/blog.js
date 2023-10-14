const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
   careProviderId:String,
   title:String,
   desc:String,
   date:String,
   likes:Number,
   comment:Array,
   images:String,
   type:String,
   careProviderName:String,
   careProviderImage:String
});

const blogs = mongoose.model('blogs', blog);

module.exports = blogs;