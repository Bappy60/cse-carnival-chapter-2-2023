const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const admin=require("../models/administrators");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const superadmin=require("../models/superadmin");
const session=require("../models/session");
const upload=require("../uploadsystem/uplod");
// const transporter = nodemailer.createTransport({
//     service:"smtp",
//     host: 'mail.talkwithsatori.com',
//     port: 465,
//     secure:"false",
//     auth: {
//         user: process.env.app_user,
//         pass:  process.env.app_pass,
//     },
   
// });
const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure:false,
    auth: {
        user: process.env.app_user,
        pass:  process.env.app_pass,
    },
   
});
  router.post("/createadminsitrator",async(req,res)=>{

    const {email,password,companyName,phone,}=req.body;
    let saltRounds = 10;
let hashedPassword = await bcrypt.hash(password, saltRounds);
    admin.findOne({email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
        let newAdmin=new admin();
        newAdmin.companyName = companyName;
        newAdmin.email = email;
        newAdmin.password=hashedPassword
        newAdmin.phone=phone;
        newAdmin.dateStart=new Date().toLocaleDateString();
        newAdmin.save().then(createdAdmin=>{
          res.send(createdAdmin);

        }).catch(err=>{
            res.status(400).send(err);
            
        })
    }
    }).catch(err=>{
        res.status(400).send(err);
    })
});

router.get("/profile",async(req,res)=>{
    admin.findOne({_id:req.query.id}).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})

router.put("/editprofile",upload.single("images"),async(req,res)=>{
    let images="";
    const updatedProfile={  companyName:req.body.companyName,
        phone:req.body.phone,};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
    admin.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
});


router.post("/checkemail",async(req,res)=>{
    admin.findOne({email:req.body.email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
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
    }
    }).catch(err=>{
        res.status(400).send(err);
    })
    
})

router.post("/createsession",async(req,res)=>{
    const createSession=await session.create(req.body);
    res.send(createSession);

})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const administratorUser=await admin.findOne({email:req.body.email});
    if(administratorUser){
    const passwordMatch=await bcrypt.compare(password,administratorUser.password);
    if(passwordMatch)
    res.send(administratorUser);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.put("/updatepassword",async(req,res)=>{
    console.log(req.body);
  const {old,newP,id}=req.body;
  const user=await admin.findOne({_id:id});
  const passwordMatch=await bcrypt.compare(old,user.password);
  console.log(passwordMatch)
  if(passwordMatch)
  {
    let hashedPassword = await bcrypt.hash(newP, 10);
    const updated=await admin.updateOne({_id:id},{
        password:hashedPassword
    });
    if(updated)
    res.send("Successfully Updated");
else 
res.status(400).send("Failed to update password");

  }
  else
  res.status(400).send("Old password is not correct");
});
const stripe = require('stripe')('sk_test_51NW200FWCeACHFzezhRvEtteg8Qs3sVoVc1oUrHPREWNAnFxpPDJG8SAcjxlyZGLDGNBh3K1copbsHb7hPKTXrq3006VDfZMVO');

router.post('/pay', async (req, res) => {
   
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100*parseInt(req.body.members),
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment'},
        automatic_payment_methods: {enabled: true}

      });
  
      res.json({'client_secret': paymentIntent['client_secret']})
  });
module.exports=router;