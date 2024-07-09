import React, { useRef } from "react";
import {
  StyledFormControl,
  StyledBox,
  StyledIcon,
  Item,
  StyledBackButton
} from "../../../materialUİElements/backDropMUİ";
import { Typography, TextField, InputAdornment, Button } from "@mui/material";

const handleFileChange = (event) => {
  const fileList = event.target.files;
  // Handle the selected files
  console.log(fileList);
};

const handleDrop = (event) => {
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  // Handle the dropped files
  console.log(fileList);
};

const CreateServer = ({back}) => {
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    // Open the file input when the box is clicked
    fileInputRef.current.click();
  };

  const postServer = async ({ name }) => {
    let responseData = {};
    try {
      const response = await fetch("http://localhost:3000/server/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      });

      responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      return responseData;
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    //const password = formData.get("password");
    try {
      const userİnfo = await postServer({ name }); // Call your loginUser function with form data
      
      window.location.reload();
    } catch (error) {
      //setError({ error: true, type: error.message });
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <>
      <Item elevation={4}>
        <StyledFormControl
         component="form"
         onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              margin: "15px 10px 25px 10px",
              color: "white",
              fontSize: "30px",
            }}
          >
            Customise Your Server
          </Typography>
          <StyledBox
            onClick={handleBoxClick}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <StyledIcon />
            <Typography component="div" sx={{ color: "white" }}>
              Upload
            </Typography>
          </StyledBox>
          <TextField
            id="outlined-basic"
            label="NameOftheChat"
            variant="outlined"
            name="name"
            required
            style={{
              bottom: "0",
              left: "0",
              width: "90%",
              marginTop: "45px",
            }}
           /*  InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                
                </InputAdornment>
              ),
            }} */
          />
           <Button
                    type="submit"
                    variant="contained" // Can be 'contained', 'outlined', etc.
                    size="small" // Smaller button to fit within the text field
            >
                    Create
           </Button>
           <StyledBackButton onClick={back}>Back</StyledBackButton>
        </StyledFormControl>
      </Item>
    </>
  );
};

export default CreateServer;
