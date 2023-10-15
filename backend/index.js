const express = require("express");
var bodyParser = require('body-parser');
const dotenv=require("dotenv");
const cors = require("cors");


const app = express();
app.use(cors());


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

dotenv.config({path:"./config.env"});
require("./db/conn.js");
app.use("/images",express.static("uploads"))

const members=require("./routes/normal_user");
const careprovider = require("./routes/careprovider.js")
const blog=require("./routes/blog");
const admin=require("./routes/administrator.js");
const superadmin=require("./routes/superadmin");

app.use("/superadmin",superadmin)
app.use("/blog",blog);
app.use("/normaluser",members)
app.use("/careprovider",careprovider)
app.use("/admin",admin)

app.listen("5000", () => {
    console.log("Server is running!");
  });
