import { useState } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { baseURL } from "../../../config.js";

function RepresentativeLogin()
{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState(true);
const [dberror,setDbError]=useState(false);
function isValidEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
  }
const handleEmailChange=(e)=>{
   if( isValidEmail(e.currentTarget.value)&&password.length>0)
   setError(false);
   else
   setError(true);
   setEmail(e.currentTarget.value);
}
const handlePasswordChange=(e)=>{
    console.log(isValidEmail(e.currentTarget.value)&&email.length>0);
    if( email.length>0)
    setError(false);
else
setError(true);
    setPassword(e.currentTarget.value);
 }
 const [navigate,setNavigate]=useState(false);

 const submit=(e)=>{
    e.preventDefault();
    axios.post(`${baseURL}/members/login`,{
        email,password
    }).then(result=>{
        console.log(result);
        Cookies.set("memberId",result.data._id,{expires:365});
        Cookies.set("email",result.data.email,{expires:365})
    setNavigate(true);
 
    }).catch(err=>setDbError(true))
 }
return(
    <div style={{width:"100%",paddingTop:"30px"}}>
        {navigate&&<Navigate to="/member"></Navigate>}

     <p style={{fontWeight:"bold",marginBottom:"20px"}}>LogIn</p>
     <form style={{width:"75%",margin:"0px auto"}}>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Email Address</label>
        <input type="email"value={email}onChange={handleEmailChange} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Password</label>
        <input type="password" value={password}onChange={handlePasswordChange} style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        {dberror&&<p style={{color:"red"}}>No such email and password combintation found</p>}
        <button onClick={error?"":submit} style={{backgroundColor:error?"#D9D9D9":"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Submit</button>
     </form>
<a href="/" style={{color:"black",marginTop:"10px",textDecoration:"underline",fontWeight:"normal",marginBottom:"40px",display:"block"}}>Forget Password</a>

    </div>
)
}

export default RepresentativeLogin;