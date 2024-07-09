import React from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import {
  StyledFormControl,
  Item,
  StyledBackButton
} from "../../../materialUİElements/backDropMUİ";
import { Typography, TextField, InputAdornment, Button, Box } from "@mui/material";



const CreateGroup = ({id}) => {
const dispatch = useDispatch();

const create = async ({ name }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/server/${id}/group/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(response);
    }
    console.log(responseData);
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    /* console.log("Catch:", error.message); */
    /* throw error.message === "0"
      ? new Error(`User name or Password is wrong`)
      : new Error("Server is Down"); */
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("group-name");
  
  try {
   const channelİnfo = await create({ name }); // Call your loginUser function with form data
    
    window.location.reload();

    // Redirect to login page after successful sign-up
  } catch (error) {
    /* console.error("Error signing up:", error); */
    console.log(error);
    // Handle error (e.g., display error message to user)
  }
};

  return (
    <>
      <Item elevation={4} height ={40} >
        <StyledFormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
          onSubmit={handleSubmit}
          component="form"
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
            Create Group
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              margin: "5px 10px",
              color: "white",
              fontSize: "14px",
            }}
          >
            Name Of The Group
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "90%",
              marginTop: "20px",
            }}
          >
          <TextField
            id="outlined-basic"
            label=" New Group"
            name="group-name"
            variant="outlined"
            style={{
              bottom: "0",
              left: "0",
              width: "90%",
              marginTop: "20px",
            }}
           /*  InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained" // Can be 'contained', 'outlined', etc.
                    size="small" // Smaller button to fit within the text field
                  >
                    Add
                  </Button>
                </InputAdornment>
              ),
            }} */
          />
           <Button
              type="submit"
              variant="contained" // Can be 'contained', 'outlined', etc.
              size="small" // Smaller button to fit within the text field
            >
              Add
            </Button>
          </Box>
         <StyledBackButton onClick={() => {dispatch(setToggle(""));}}>Back</StyledBackButton>
        </StyledFormControl>
      </Item>
    </>
  );
};

export default CreateGroup;
