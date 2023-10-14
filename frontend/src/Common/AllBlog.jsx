import { Box, Grid, Paper } from "@mui/material";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../config";
import RecipeReviewCard from "../CareProvider/Blogs/BlogCard";

  
export default function AllBlogs(){
    const [blogs,setBlogs]=useState([]);
  useEffect(()=>{
    axios.get(`${baseURL}/blog/allblogs`).then(res=>{
        setBlogs(res.data);
    }).catch(err=>console.log(err))
  })
    return (
        <div>
            <Box>
               <Navbar/>
               <Box sx={{width:"75%",margin:"30px auto"}}>
              {blogs.length>0&& <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {blogs.map((blog, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <RecipeReviewCard card={blog}/>
    </Grid>
  ))}
</Grid>}
               </Box>
            </Box>
        </div>
    )
}