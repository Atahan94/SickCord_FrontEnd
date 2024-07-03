import React from "react";
import UserChats from "../userChats";
import { StyledBox1, StyledBox2} from "../../../../materialUİElements/sectionsMUİ";
import UserBar from "../../Uİ-utility/userBar.js"

import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';

import {
  Typography,
  Box,
} from "@mui/material";


const ChatsSection = ({toggle}) => {

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
        <StyledBox1
          sx={{
            justifyContent: "unset",
          }}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={()=>{toggle(true)}}
          backgroundColor={ "rgba(0, 0, 0, 0)"
}
        >
          <EmojiPeopleOutlinedIcon style={{margin:"0px 20px 0px 6px"}}/>
          <Typography>Friends</Typography>
        </StyledBox1>
      </Box>
      <StyledBox2
      >
       <UserChats toggle={()=>{toggle(false)}}/>
       </StyledBox2>
       <UserBar/>
    </>
  );
};

export default ChatsSection;
