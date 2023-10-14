const mongoose=require("mongoose");

const uri = process.env.DATABASE;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
  console.log("Connected")
})
.catch(err => console.log(err))