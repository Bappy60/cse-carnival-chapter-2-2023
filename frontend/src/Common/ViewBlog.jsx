import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../config";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";

export default function ViewBlog() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseURL}/blog/getblog?id=${id}`)
      .then((res) => {
        setBlog(res.data[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      <Navbar />
      {Object.keys(blog).length > 0 && (
        <Box sx={{ width: "75%", margin: "30px auto" }}>
          <Typography variant="h4" sx={{ marginTop: "30px", display: "block" }}>
            {blog.careProviderName}
          </Typography>
          <Typography
            variant="p"
            sx={{ display: "block", lineHeight: 1.5, marginBottom: "20px" }}
          >
            Authored Date: {blog.date}
          </Typography>
          <img
            src={`${baseURL}/images/${blog.images}`}
            style={{ width: "75%" }}
          />
          <Typography
            variant="h6"
            sx={{ marginTop: "30px", marginBottom: "30px", display: "block" }}
          >
            {blog.title}
          </Typography>
          <Typography
            variant="p"
            sx={{
              display: "block",
              lineHeight: 1.5,
              textAlign: "start",
              marginLeft: "14%",
            }}
          >
            {blog.desc}
          </Typography>
        </Box>
      )}
    </div>
  );
}
