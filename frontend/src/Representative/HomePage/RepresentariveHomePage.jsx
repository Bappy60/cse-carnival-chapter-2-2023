import { Box, Button, Stack, Typography } from "@mui/material";
import {NavLink} from "react-router-dom"
import Navbar from "../../Common/Navbar";
import { useEffect, useState } from "react";
import { baseURL } from "../../../config";
import axios from "axios"
export default function RepresentativeHomePage()
{
    const [sessions,setSessions]=useState([]);
    const height=window.innerHeight;
    // useEffect(()=>{
    //     axios.get(`${baseURL}/admin/getsessions`).then(res=>{
    //         console.log(res);
    //         setSessions(res.data);
    //     })
    // })
    return (
        <div>
            <Navbar/>
            <Box sx={{width:"75%",margin:"20px auto",}}>
                <Box>
               <Typography variant="h5" sx={{display:"inline-block"}}>Request for your community or corporate session?</Typography>
               <NavLink to="/represent/sessioncreate/"><Button variant="contained" sx={{marginLeft:"30px"}}>Request</Button></NavLink></Box>
              
            </Box>
          
        </div>
    )
}