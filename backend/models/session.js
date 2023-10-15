const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessions = new Schema({
    
     representId:String,
     companyName:String,
     email:String,
     dateTime:Date,
     members:String,
     verified:Boolean,
    phone:String,
    sessionDate:String

});

const session = mongoose.model('sessions', sessions);

module.exports = session