const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { compareSync, hashSync } =require("bcrypt");
const member=require("../models/normal_user");
const upload=require("../uploadsystem/uplod");



const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure:false,
    auth: {
        user: process.env.app_user,
        pass:  process.env.app_pass,
    },
   
});


router.post("/createuser",async(req,res)=>{
    let saltRounds = 10;
    req.body.hours=5;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password=hashedPassword;
    req.body.onboardDate=new Date().toLocaleDateString();
    const newMember = await member.create(req.body);
    res.json({
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        email: newMember.email,
        _id: newMember._id,
      });
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const getUser=await member.findOne({email:req.body.email});
    if(getUser){
    const passwordMatch=await bcrypt.compare(password,getUser.password);
    if(passwordMatch)
    res.send(getUser);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.get("/profile",async(req,res)=>{
  const result= await member.findOne({_id:req.query.id});
  res.send(result);


});
router.put("/updateprofile",upload.single("images"),async(req,res)=>{
  let images="";
  const updatedProfile={  dob:req.body.dob,
      country:req.body.country,languages:req.body.languages.split(","),};
 if(req.file){
  images=req.file.filename;
  updatedProfile.images=images;   
}
console.log(updatedProfile)
  member.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No care provider found"))
});

router.post("/checkemail",async(req,res)=>{
    
  
        const mailOptions = {
            from:process.env.app_user,
            to: `${req.body.email}`,
            subject: 'OTP to verify',
           
            html: ` <div style=" width: 85%;margin: 20px auto;">
             <p style="font-size:18px;text-align: center;">Use the following OTP to verify your Satori Account: </p>
             <p style="font-size:28px;text-align: center; font-weight: 900;">${req.body.otp} </p>
         <p style="font-size:18px;text-align: center;margin-top: 20px;">If you didn't request this, please ignore it or let us know</p>
        
          </div>`,
        
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email: ' + error);
              res.status(400).send("Something wrong happened!Try Again")
           
            } else {
              console.log('Email sent: ' + info.response);
              res.send("Email Sent")
            
            }
          });
    
   
   
});
  
module.exports=router;