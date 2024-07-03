import { useState } from "react";
import React from "react";
import {StyledBox3, StyledButtonBase } from "../../../materialUİElements/sectionsMUİ";

import {
  HeadsetOffOutlined as HeadsetOffOutlinedIcon,
  HeadphonesOutlined as HeadphonesOutlinedIcon,
  MicNoneOutlined as MicNoneOutlinedIcon,
  MicOffOutlined as MicOffOutlinedIcon,
} from "@mui/icons-material";

import {
  Typography,
  Box,
} from "@mui/material";

const UserBar = () => {
    const [micToggle, setmicToggle] = useState(true);
    const [headPhoneToggle, setheadPhoneToggle] = useState(true);

    const handleClick = (var1, var2, callback1, callback2, condition) => {
      let bool = !var1;
                  callback1(bool);
                  callback2(var2 === !condition && bool === condition? condition: var2)
      }
  return (
    <StyledBox3>
        <Box style={{ display: "flex" }}>
          <img
            src="./images/8922789.png"
            alt="Image"
            className="channel-tab-user-image"
          />
          <Typography>User Name</Typography>
        </Box>
        <Box style={{ display: "flex", marginRight: "10px" }}>
          <StyledButtonBase
            onClick={() => {
              handleClick(micToggle, headPhoneToggle, setmicToggle, setheadPhoneToggle, true);
            }}
            
          >
            {micToggle === true ? (
              <MicNoneOutlinedIcon />
            ) : (
              <MicOffOutlinedIcon />
            )}
          </StyledButtonBase>
          <StyledButtonBase
            onClick={() => {
              handleClick(headPhoneToggle, micToggle, setheadPhoneToggle, setmicToggle, false);
            }}
          >
            {headPhoneToggle === true ? (
              <HeadphonesOutlinedIcon />
            ) : (
              <HeadsetOffOutlinedIcon />
            )}
          </StyledButtonBase>
        </Box>
      </StyledBox3>
  )
}

export default UserBar;