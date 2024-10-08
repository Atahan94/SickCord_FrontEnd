import React, { useRef } from "react";
import {
  StyledFormControl,
  Item,
  StyledBackButton
} from "../../../materialUİElements/backDropMUİ";
import { Typography, TextField, InputAdornment, Button } from "@mui/material";



const JoinServer = ({back}) => {


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
            Join A Server
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
            Find and connect with your community
          </Typography>
          <TextField
            id="outlined-basic"
            label="URL of the server"
            variant="outlined"
            style={{
              bottom: "0",
              left: "0",
              width: "90%",
              marginTop: "70px",
            }}
            InputProps={{
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
            }}
          />
         <StyledBackButton onClick={back}>Back</StyledBackButton>
        </StyledFormControl>
      </Item>
    </>
  );
};

export default JoinServer;
