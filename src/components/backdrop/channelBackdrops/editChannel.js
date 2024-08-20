import React from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import {
  StyledFormControl,
  Item,
  StyledBackButton,
} from "../../../materialUİElements/backDropMUİ";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";

const EditChannel = ({ id, channelID, groupID }) => {
  const dispatch = useDispatch();

  
  const deleteChannel = async () => {
    try {
      const response = await fetch(
        `https://sickcord-backend.onrender.com/server/${id}/${groupID === ""? `channel/delete/`:`group/${groupID}/deleteChannel/`}${channelID}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(response);
      }
      console.log(responseData);
      window.location.reload();
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      /* throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down"); */
    }
  };
  const editChannel = async ({ name, type }) => {
    try {
      const response = await fetch(
        `https://sickcord-backend.onrender.com/server/${id}/${groupID === ""? `channel/edit`:`group/${groupID}/editChannel/`}${channelID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, type }),
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
    const type = formData.get("radio-buttons-group");
    const name = formData.get("channel-name");

    try {
     const channelİnfo = await editChannel({ name, type }); // Call your loginUser function with form data
      
      window.location.reload();

      // Redirect to login page after successful sign-up
    } catch (error) {
      /* console.error("Error signing up:", error); */
      console.log(error);
      // Handle error (e.g., display error message to user)
    }
  };
  
  console.log("EDİT CHANNEL severID", id, "channelid", channelID,"isGroups", groupID == ""? "no group": "group" ,"Edit group channel", groupID)

  return (
    <>
      <Item elevation={4}>
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
            Edit Channel
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
            Type Of Channel
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="text"
            name="radio-buttons-group"
          >
            <FormControlLabel value="text" control={<Radio />} label="Text" />
            <FormControlLabel value="voice" control={<Radio />} label="Voice" />
          </RadioGroup>
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
              label="Name Of The Channel"
              name="channel-name"
              variant="outlined"
              style={{
                bottom: "0",
                left: "0",
              }}
            />
            <Button
              type="submit"
              variant="contained" // Can be 'contained', 'outlined', etc.
              size="small" // Smaller button to fit within the text field
            >
              Edit
            </Button>
          </Box>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              margin: "5px 10px",
              color: "white",
              fontSize: "14px",
            }}
          >
            Or
          </Typography>
          <Button
              variant="contained" // Can be 'contained', 'outlined', etc.
              size="small" // Smaller button to fit within the text field
              onClick={deleteChannel}
            >
              Delete
            </Button>
          <StyledBackButton
            onClick={() => {
              dispatch(setToggle(""));
            }}
          >
            Back
          </StyledBackButton>
        </StyledFormControl>
      </Item>
    </>
  );
};

export default EditChannel;
