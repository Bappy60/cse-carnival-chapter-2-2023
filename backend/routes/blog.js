const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const upload=require("../uploadsystem/uplod");
const blogs = require("../models/blogs");
const carepro=require("../models/careprovider");
router.post("/createblog",upload.single("images"),async(req,res)=>{
    let images="";
    const careP=await carepro.findOne({_id:req.body.id})
    const updatedProfile={  title:req.body.title,
        desc:req.body.desc,date:new Date().toLocaleDateString(),careProviderId:req.body.id,careProviderName:careP.firstName+" "+careP.lastName};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
console.log(updatedProfile);
const result=await blogs.create(updatedProfile);
console.log(result);
res.send({id:result._id});

});

router.get("/allblogs",async(req,res)=>{
    const blogs1=await blogs.find({});
    res.send(blogs1);

})

router.get("/getblog",async(req,res)=>{
    const blogs1=await blogs.find({_id:req.query.id});
    res.send(blogs1);

})

module.exports=router;