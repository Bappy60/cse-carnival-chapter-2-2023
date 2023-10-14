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

app.use("/normaluser",members)

app.listen("5000", () => {
    console.log("Server is running!");
  });