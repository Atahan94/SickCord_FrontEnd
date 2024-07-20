import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  StyledFlowBox,
  StyledFlowBox1,
  StyledButtonBase,
} from "../../../materialUİElements/sectionsMUİ";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";

const Flow = ({ toggle, isServer, prevmessage, name }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // Add the new message to the chat flow
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage(""); // Clear the input field
    }
  };

  return (
    <>
      <StyledFlowBox>
        <StyledFlowBox1>
          <Typography sx={{ color: "white", marginLeft: "15px" }}>
            {name? name :"Name Of the User" }
          </Typography>
          <Box>
            <StyledButtonBase
              onClick={toggle}
              sx={{
                margin: "0px 10px",
              }}
            >
              {isServer === true ? (
                <PeopleOutlinedIcon style={{ color: "white" }} />
              ) : (
                <AccountCircleOutlinedIcon style={{ color: "white" }} />
              )}
            </StyledButtonBase>
            <TextField
              label="Filled"
              variant="filled"
              style={{ left: "0", marginRight: "20px" }}
              InputProps={{
                // Change the height by adjusting the padding and font size
                sx: {
                  height: "31px", // Change the height of the TextField
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon style={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                // Adjust the label's position to align with the new height
                sx: {
                  top: "-11px", // Adjust the label's top position
                },
              }}
            />
          </Box>
        </StyledFlowBox1>
        {chatMessages.map((msg, index) => (
          <Typography key={index}>{msg}</Typography> // Display each message
        ))}
      </StyledFlowBox>
      <TextField
        id="outlined-basic"
        label="NameOftheChat"
        variant="outlined"
        style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleSendMessage}
                variant="contained" // Can be 'contained', 'outlined', etc.
                size="small" // Smaller button to fit within the text field
              >
                Send
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default Flow;
