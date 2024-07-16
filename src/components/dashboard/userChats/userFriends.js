import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Divider, TextField, useTheme, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  StyledFlowBox,
  StyledFlowBox1,
} from "../../../materialUİElements/sectionsMUİ";
import { StyledFormControl, StyledButton, ErrorBox } from "../../../materialUİElements/formMUİ";
import { color } from "@mui/system";
const UserFriends = () => {
  const [currentView, setCurrentView ]= useState("All")
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [message, setMessage] = useState({ error: false, type: "" });
  const curTheme = useTheme();
  
  useEffect(() =>{
setMessage({ error: false, type: "" })
  }, [currentView])


  const addFriend = async (name) => { try {
    const response = await fetch(`http://localhost:3000/user/addFriend`, {
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

  const navButtons = [
    {
      text: "Online",
      action: function (text) {
        console.log(text); // this now refers to the object context
        setCurrentView(text)
      },
    },
    {
      text: "All",
      action: function (text) {
        console.log(text); // this now refers to the object context
        setCurrentView(text)
      },
    },
    {
      text: "Waiting",
      action: function (text) {
        console.log(text); // this now refers to the object context
        setCurrentView(text)
      },
    },
    {
      text: "Add Friend",
      action: function (text) {
        console.log(text); // this now refers to the object context
        setCurrentView(text)
      },
    },
  ];
  return (
    <>
     <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="Online" value="1" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="All" value="2" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="Waiting" value="3" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "darkgreen",
                    },
                    color:"green"
                    }} label="Add Friend" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">
        <>
        <StyledFormControl sx={{width: "100%", marginTop: "20px"}} component="form" onSubmit={handleSubmit}>
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
          {message.error ? <ErrorBox sx={{position:"absolute", top: "260px", right:"38%", fontWeight:"700"}} theme={curTheme}>{message.type}</ErrorBox> : <Typography sx={{position:"absolute", top: "187px", right:"44%", fontWeight:"700",color: "green"}} >{message.type}</Typography>}
          </></TabPanel>
      </TabContext>
    </Box>
     
    </>
  );
};

export default UserFriends;
