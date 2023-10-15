import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../config";
import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";
import {TextField} from '@mui/material'; 
// stripe
import {useStripe, useElements,CardNumberElement} from '@stripe/react-stripe-js';
import { country_list } from "../../Administrator/Payment/countrynames";
import CardInput from "../../Administrator/Payment/CardInput";
export default function MakePayment({data}){

    const [name, setName] = useState('');
    const [country, setCountry] = useState('Bangladesh');
    const [navigate,setNavigate]=useState(false);
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmitPay = async (event) => {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const res = await axios.post(`${baseURL}/admin/pay`, {name: name,id:Cookies.get("id"),members:data.members});
  
      const clientSecret = res.data['client_secret'];
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card:elements.getElement(CardNumberElement),
          billing_details: {
            name: name,
          },
        },
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Money is in the bank!');
         axios.post(`${baseURL}/admin/createsession`,{...data,representId:Cookies.get("id")}).then(res=>{
            console.log(res);
            setNavigate(true);
         }).catch(err=>console.log(err))
        }
      }
    };
  
    
    const [cardInput,setShowcardInput]=useState(false);

    return (
        <Box sx={{width:"75%",margin:"30px auto"}}>
            <Typography variant="h5">You will be charged {data.members}x100: {data.members*100} taka</Typography>
          <Stack direction="row" sx={{justifyContent:'space-between',gap:"30px"}}>
         {navigate&&<Navigate to="/represent/home"></Navigate>}
          <div style={{flex:1}}>
    <div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
    <div style={{flex:2}}>
      <h3 style={{fontSize:"35px",textAlign:'start',marginBottom:"0px"}}>Enter Payment Details</h3>
      <p style={{fontSize:"16px",textAlign:'start',fontWeight:500,marginBottom:"20px",marginTop:"0px"}}>You wont be charged yet</p>
       <p style={{fontSize:"16px",textAlign:'start',fontWeight:600}}>Card Information</p>
        <CardInput />
        <div >
        <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Name on Card</p>
        <TextField
        
          id='outlined-email-input'
          sx={{borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }, '& label.Mui-focused': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiInput-underline:after': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&:hover fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
          },}}
          margin='normal'
        
          type='text'
          placeholder='Enter Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
         {/* <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Card Holder Email</p>
        <TextField
          label='Email'
          id='outlined-email-input'
          placeholder='Enter Email'
          margin='normal'
        
          type='email'
          required
          sx={{borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        /> */}
        <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Country or Region</p>
       <Select value={country}  sx={{width:"100%",textAlign:"start",borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }, '& label.Mui-focused': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiInput-underline:after': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&:hover fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
          },}} onChange={e=>setCountry(e.target.value)}
>
        {country_list.map(country1=>{
          return <MenuItem key ={country1} value={country1} >{country1}</MenuItem>
        })}
        </Select>
        </div>
    </div>
  
           
    </div>
    <button onClick={handleSubmitPay} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",width:"75%",marginTop:"30px"}}>Confirm</button>
    </div>
          </Stack>
        </Box>
    )
}