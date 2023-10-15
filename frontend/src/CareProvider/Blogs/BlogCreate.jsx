import { Box, MenuItem, Select } from "@mui/material";
import Navbar from "../../Common/Navbar";
import axios from "axios";
import { baseURL } from "../../../config";
import { useState } from "react";
import psy from  "../../assets/images/psy.jpg"
import { Navigate } from "react-router-dom";
export default function CreateBlog(){
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
const [dberror,setDbError]=useState(false)
const rows= [{value:"Title",label:"title"},{value:"Description",label:"desc"},];
    const submit=(event)=>{ 
        event.preventDefault();
        console.log(data)
        if(data.title&&data.desc){
       const dat=new FormData()
        dat.append('images', images);
         dat.append("title",data.title);
         dat.append("desc",data.desc);
         dat.append("type",data.type);
         dat.append("id","6501ae9cee1e377314d848bf")
        axios.post(`${baseURL}/blog/createblog`,dat).then(res=>{
            console.log(res);
            setSuccess(true);
            setData({...data,id:res.data.id})
          },{headers: {
            Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
            }}).catch(err=>console.log(err))
        }
        else

        setError(true);
    }
    const [images,setImages]=useState("");
    const [file,setFile]=useState("");
    const handleImageChange=(event)=>{
      console.log(event.target.files[0])
      setImages(event.target.files[0]);
      setFile(URL.createObjectURL(event.target.files[0]));
    };
    const allTypes=[
        "Prejudice and discrimination","Social cognition","Person perception","Attitudes","Social control and cults","Persuasion, propaganda, and marketing","Attraction, romance, and love","Nonverbal communication","Prosocial behavior","Leadership","Sucidal"
    ]
    const [data,setData]=useState({type:"Prejudice and discrimination",});
    return (
        <Box>
            {success&&<Navigate to={`/viewblog/${data.id}`}></Navigate>}
           <Navbar/>
           <Box sx={{marginTop:"30px",marginBottom:"30px",width:"65%",margin:"30px auto"}}>
            <h3>Write an article so that the patients can learn things about various things of Pyscology</h3>
           {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={"text"} value={data[row.label]} placeholder={row.value} onChange={e=>{
            console.log(e.currentTarget.value);
            setData({...data,[row.label]:e.currentTarget.value});
}} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Choose which type of the <span style={{color:"red"}}>*</span></label>

<Select value={data.type} onChange={e=>setData({...data,type:e.target.value})}sx={{flex:2,display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  {allTypes.map((v, i) => <MenuItem key={v} value={i+1}>{v}</MenuItem>)}
    </Select>
 {file===""&&  <img src={psy} style={{width:"500px",height:"500px",}}/>}
     {file!==""&&  <div>
      
      <img src={file} style={{width:"500px",height:"500px",}}/>
    </div>}
    <input
      className="custom-file-input2"
       type="file"
       name="images"
       onChange={handleImageChange}
       style={{ display: "block", margin: "10px auto",width:"120px" }}
     />
        
    {error&&<p style={{color:"red"}}>All fields has to be submitted</p>}
     <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Blog</button>

           </Box>
        </Box>
    )
}