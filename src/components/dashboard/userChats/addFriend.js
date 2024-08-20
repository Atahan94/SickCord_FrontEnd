import React from "react";
import { useState, useEffect } from "react";
import {Typography, TextField, useTheme} from "@mui/material";
import { StyledFormControl, StyledButton, ErrorBox } from "../../../materialUİElements/formMUİ";



const AddFriend = () => {

  const [message, setMessage] = useState({ error: false, type: "" });
  const curTheme = useTheme();
  
  const addFriend = async (name) => { try {
    const response = await fetch(`https://sickcord-backend.onrender.com/user/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type: "user" }),
      credentials: "include",
    });

    const responseData = await response.json();
   
    console.log("res type", responseData, response)

    if (!response.ok) {
      throw new Error(responseData.code);
    }
    setMessage({ error: false, type: responseData.res})
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    console.log("Catch:", error.message);
    throw new Error(error.message)
  }}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("user-name");

    try {
     await addFriend( name ); // Call your loginUser function with form data
     
     
      // Redirect to login page after successful sign-up
    } catch (error) {
      console.log("Error signing up:", error);
      setMessage({ error: true, type: error.message });
      // Handle error (e.g., display error message to user)
    }
  };

  
  return (
    <>
        <StyledFormControl sx={{width: "100%", marginTop: "20px", alignItems:"center"}} component="form" onSubmit={handleSubmit}>
        {message.error ? <ErrorBox sx={{ fontWeight:"700"}} theme={curTheme}>{message.type}</ErrorBox> : <Typography sx={{ fontWeight:"700",color: "green"}} >{message.type}</Typography>}
         <TextField
            id="outlined-basic"
            label="User Name"
            name="user-name"
            variant="outlined"
            style={{
              bottom: "0",
              left: "0",
              width: "80%",
              marginTop: "45px",
              alignSelf: "center"
            }}
          />
          <StyledButton type="submit" variant="contained" color="primary" sx={{marginTop:"10px", width: "30%", alignSelf: "center"}}>
          Add
          </StyledButton>
          </StyledFormControl>
          
    
     
    </>
  );
};

export default AddFriend;
