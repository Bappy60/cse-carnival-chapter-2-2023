import { useState } from "react"
import RadioPositionEnd from "./ChooseRadio";
import Navbar from "../../Common/Navbar";
import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";

import CorporatePayment from "./CorpoatePayment";
export default function CreateSession(){
    function handleDateUpdate(e) {
        const dateValue = e.target.value;
        console.log("dateValue", dateValue);
        setData({...data,sessionDate:dateValue.toLocaleDateString()});  // state variable updated here
      }
    const [startDate, setStartDate] = useState(new Date());
    const [corporatePayment,setcorporatePayment]=useState(false);
    const [data,setData]=useState({email:Cookies.get("email")});
    const [session,setSession]=useState({});
    const corporateRows= [{value:"Company Name",label:"companyName"},{value:"Email Address",label:"email"},{value:"Phone",label:"phone"},{value:"How Members likely to be joined",label:"members"},];
    const communityRows= [{value:"Represntative Name",label:"name"},{value:"Phone",label:"phone"},{value:"How Members likely to be joined",label:"members"},];
     const [what,setWhat]=useState("");
    return (
        <div>
            <Navbar/>
           {what===""&&<div>
            <Typography variant="h4">Choose what type of group session you want to do</Typography>
           <RadioPositionEnd setWhat={setWhat}/>
           </div>}
           {what!==""&&!corporatePayment&&
           <div style={{width:"45%",margin:"30px auto"}}>
            <Typography variant="h5"sx={{marginBottom:"30px"}}>Fill up the form and we will contact you as soon as possible</Typography>
            {what==="Corporate"? <div>
            {corporateRows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={"text"} value={data[row.label]} placeholder={row.value} onChange={e=>{
    console.log(row.label);
    
    setData({...data,[row.label]:e.currentTarget.value})
}} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
      <p style={{display:"block"}}>Pick Session Date</p>
<input type="date"onChange={handleDateUpdate}/>
<Box sx={{marginTop:"20px"}}>
     <Button variant="contained" onClick={e=>setcorporatePayment(true)}>Submit</Button>
     </Box>
      </div>:<div>
            {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={"text"} value={data[row.label]} placeholder={row.value} onChange={e=>{
    console.log(row.label);
    
    setData({...data,[row.label]:e.currentTarget.value})
}} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
     <Button variant="contained">Submit</Button>

      </div>}
            </div>}
            {corporatePayment&&<CorporatePayment data={data}/>}
          </div>
    )
}