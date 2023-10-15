import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import Navbar from "../../Common/Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../../config";
import OTPInput from "../../Common/OTPPage";
import "../../assets/css/signup.css"
import RepresentativeLogin from "./RepresentativeLogin";
function RepresentativeRegister()
{
const queryParameters = new URLSearchParams(window.location.search);
const [data,setData]=useState({email:queryParameters.get("email"),first:"",last:"",password:"",cpass:"",companyId:queryParameters.get("companyId")})
const [error,setError]=useState(true);
const [dberror,setDbError]=useState(false)
const rows= [{value:"Work Email",label:"email"},{value:"Company Name",label:"companyName"},{value:"Phone",label:"phone"},{value:"Password",label:"password"},{value:"Confirm Password",label:"cpass"}];
function isValidEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
}
const [navigate,setNavigate]=useState(false);
// const submit=(e)=>{
//     e.preventDefault();
//     setTimeout(() => {
//         setNavigate(true);
//     }, 2000);
// }
const [otp,setOtp]=useState();
useEffect(()=>{
   
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        setOtp(OTP);
     
},[]);
const checkCorrectOrNot=(e,label)=>{
    setDbError(false);
    console.log(data);
    let pass=data.password;
  if(label==="password")
  pass=e.currentTarget.value
    if( data.email&&pass===data.cpass&&data.password&&isValidEmail(data.email))
    setError(false);
else
setError(true);
 }
const [what,setWhat]=useState("login")
// useEffect(()=>{
//    const queryParameters = new URLSearchParams(window.location.search);
   
//   const email = queryParameters.get("email")
//   const companyId = queryParameters.get("companyId");
//   console.log(email);
//   setData({...data,email})
//   setData({...data,companyId:companyId})
// },[data])

const handleCPassword=(e)=>{
    setData({...data,cpass:e.currentTarget.value});

    if(data.companyName.length>0&&data.email.length>0&&data.password===e.currentTarget.value&&data.phone.length>0&&data.password.length>7&&isValidEmail(data.email))
       
    setError(false);
    
    else
    setError(true);
}

 const submit=(e)=>{
    e.preventDefault();
    console.log("Signuphekl")
     axios.post(`${baseURL}/admin/checkemail`,{
       otp,email:data.email,
     }).then(res=>{
        console.log(res);
        setNavigate(true);
     }).catch(err=>{
        setDbError(true);
        console.log(err)
     })
 }
return(
    <div style={{width:"100%"}} className="maincont">
       {!navigate&& <div className="container" id="container">
       

	{what==="signup"&&<div className="form-container sign-up-container">
	
		
           <div style={{marginTop:"4rem"}}>
     <h3 style={{fontWeight:"bold",fontSize:"35px",marginBottom:"10px"}}>Welcome to MindMate</h3>
     <div style={{width:"75%",margin:"0px auto"}}>
      {rows.map((row,index)=>{
     return(  <div key={row}>
 <input type={(row.label==="password"||row.label==="cpass")?"password":"text"} value={data[row.label]} placeholder={row.value} onChange={e=>{
    console.log(row.label);
    if(row.label==="cpass")
    handleCPassword(e);
    else{
    setData({...data,[row.label]:e.currentTarget.value})
checkCorrectOrNot(e,row.label);
    }
}} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
      {dberror&&<p style={{color:"red",marginTop:"20px"}}>Email Address already in use</p>}
     {error&&   <button  disabled style={{backgroundColor:"#D9D9D9",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     {!error&& <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     </div>

    </div>
		
	</div>}
	{what==="login"&&<div className="form-container sign-in-container">
		{/* {<form action="#">
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social anchor"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social anchor"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social anchor"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#" className="anchor">Forgot your password?</a>
			<button>Sign In</button>
		</form>} */}
        <RepresentativeLogin/>
	</div>}
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost buttonadd" id="signIn" onClick={e=>{
                document.getElementById('container').classList.remove("right-panel-active");

                    setWhat("login")}}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost buttonadd" id="signUp" onClick={e=>{
                    console.log("SignUp");
                     document.getElementById('container').classList.add("right-panel-active");

                    setWhat("signup")}}>Sign Up</button>
			</div>
		</div>
	</div>
</div>}

   
    {navigate&&<OTPInput data={data} otp1={otp} type={"represent"}/>}
    </div>
)
}

export default RepresentativeRegister;