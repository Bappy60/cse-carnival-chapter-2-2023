const express = require("express");
var bodyParser = require('body-parser');
const router=express();
var axios = require("axios").default;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const superadmin=require("../models/superadmin");
const upload=require("../uploadsystem/uplod");
const careProvider = require("../models/careprovider");
const member = require("../models/normal_user");
const event = require("../models/events");

const transporter = nodemailer.createTransport({
  service:"gmail",
  port: 465,
  secure:false,
  auth: {
      user: process.env.app_user,
      pass:  process.env.app_pass,
  },
 
});
  router.post("/createcareprovider",async(req,res)=>{

    const {email,password,first,last,}=req.body;
    let saltRounds = 10;
let hashedPassword = await bcrypt.hash(password, saltRounds);
careProvider.findOne({email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
       
        new careProvider({email,password:hashedPassword,firstName:first,lastName:last,booking:false, onboardDate:new Date().toLocaleDateString()        }).save().then(createdAdmin=>{
          res.send(createdAdmin);
          
var options = {
    method: 'POST',
    url: 'https://api.calendly.com/organizations/8defa096-6b66-484d-a882-ad121f023590/invitations',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjk3MzI5MDgyLCJqdGkiOiIwN2FiM2MxNy1lMTIyLTQyZTktYmI0MC0yY2YwNTk0ZWMxNTQiLCJ1c2VyX3V1aWQiOiI3NDczMTRjMC0xNjA0LTRkNmUtYWExMS1kYjViNzVhNDIzOWMifQ.mqYVbS-Zz7K4SqPmifx_E0a0UWgVDj12rtbtW0YLbazIIj6foAfpb81yQBDa_uuYhjjDkH7PEdKK8lP4Uv5llw'
    },
    data: {email: email}
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
        }).catch(err=>{
            res.status(400).send(err);
             });
    }
    }).catch(err=>{
        res.status(400).send(err);
    })
});

router.get("/profile",async(req,res)=>{
    careProvider.findOne({_id:req.query.id}).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})

router.put("/editprofile",upload.single("images"),async(req,res)=>{
    let images="";
    let language=req.body.languages;
    const languages=language.split(",");
    console.log(req.body.scheduleLink);
    const updatedProfile={  license:req.body.license,
        degree:req.body.degree,experience:req.body.experience,specializations:req.body.specializations.split(","),expertise:req.body.expertise.split(","),languages:languages,country:req.body.country,scheduleLink:req.body.scheduleLink,bio:req.body.bio};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
if(req.body.scheduleLink&&req.body.scheduleLink!=="undefined"){
  console.log("Abhid")
  var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api.calendly.com/event_types',
  params: {
    active: 'true',
    organization: 'https://api.calendly.com/organizations/8defa096-6b66-484d-a882-ad121f023590',
    count: '100'
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjk3MzI5MDgyLCJqdGkiOiIwN2FiM2MxNy1lMTIyLTQyZTktYmI0MC0yY2YwNTk0ZWMxNTQiLCJ1c2VyX3V1aWQiOiI3NDczMTRjMC0xNjA0LTRkNmUtYWExMS1kYjViNzVhNDIzOWMifQ.mqYVbS-Zz7K4SqPmifx_E0a0UWgVDj12rtbtW0YLbazIIj6foAfpb81yQBDa_uuYhjjDkH7PEdKK8lP4Uv5llw'
  }
};

axios.request(options).then(function (response) {
  let k=0;
  console.log(response.data)
 response.data.collection.forEach(element => {
   if(element.scheduling_url===req.body.scheduleLink&&k===0)
   {
    updatedProfile.booking=true;
    careProvider.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send(err))
   k++;
   }
 });
 if(k===0){
  updatedProfile.scheduleLink="";
  careProvider.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send(err));
}
}).catch(function (error) {
  console.error(error);
});

}

else{
      
    careProvider.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send(err))
}
});


router.post("/checkemail",async(req,res)=>{
    careProvider.findOne({email:req.body.email}).then(result=>{
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

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const careProviderUser=await careProvider.findOne({email:req.body.email});
    if(careProviderUser){
    const passwordMatch=await bcrypt.compare(password,careProviderUser.password);
    if(passwordMatch)
    res.send(careProviderUser);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.put("/updatepassword",async(req,res)=>{
    console.log(req.body);
  const {old,newP,id}=req.body;
  const user=await careProvider.findOne({_id:id});
  const passwordMatch=await bcrypt.compare(old,user.password);
  console.log(passwordMatch)
  if(passwordMatch)
  {
    let hashedPassword = await bcrypt.hash(newP, 10);
    const updated=await careProvider.updateOne({_id:id},{
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

router.get("/allcareproviders",async(req,res)=>{
  const careProviders= await careProvider.find({booking:true});
  res.send(careProviders);
})
router.get("/getcareprovider",async(req,res)=>{
  const careProviders= await careProvider.findOne({_id:req.query.id});
  res.send(careProviders);
})
router.get('/search', async (req, res) => {
  const { keyword } = req.query; // Assuming 'keyword' is the parameter for the search query

  try {
      const results = await careProvider.find({
          $or: [
              { firstName: { $regex: keyword, $options: 'i' } },
              { lastName: { $regex: keyword, $options: 'i' } },
              { specializations: { $regex: keyword, $options: 'i' } },
              { bio: { $regex: keyword, $options: 'i' } },
              { degree: { $regex: keyword, $options: 'i' } },
          ],
      });

      res.json(results); // Send the search results as a JSON response
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/allevents",async(req,res)=>{
  const events=await event.find({careProviderId:req.query.id,confirmed:true,complete:false,noShow:false});
  const upcomingAppoints=[];
  const pastAppoints=[];
  events.forEach((e)=>{
      if(new Date().getTime()<new Date(e.start_time).getTime()){
          upcomingAppoints.push(e)
         
      }
      else
      pastAppoints.push(e)
  })
  res.send({upcomingAppoints,pastAppoints});
})
router.put("/updateeventcomplete",async(req,res)=>{
  const result=await event.updateOne({_id:req.body.id},{complete:true});

  res.send(result);
})

router.put("/updatenoshow",async(req,res)=>{
  const result=await event.updateOne({_id:req.body.id},{noShow:true});

  res.send(result);
})
router.put("/updatescarenotes",async(req,res)=>{
  const result=await event.updateOne({_id:req.body.id},{careNotes:req.body.careNotes});

  res.send(result);
})

router.post("/updatepayment",async(req,res)=>{
 const getEvent=await event.findOne({event:req.body.event})
  const result=await careProvider.findOne({_id:getEvent.careProviderId});
  let payments=result.payments;
  if(!payments)
  payments=[];
  const member1=await member.findOne({_id:getEvent.id});
  let payment={memberName:member1.firstName+" "+member1.lastName,eventId:getEvent._id,price:"Rp 400.000",status:"Pending",memberId:getEvent.id,start_time:getEvent.start_time,paymentDate:new Date().toLocaleDateString()};
  payments.push(payment);
  const updated= await careProvider.updateOne({_id:getEvent.careProviderId},{payments});

  res.send(updated);
})
module.exports=router;