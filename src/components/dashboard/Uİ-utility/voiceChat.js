import { useState } from "react";
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
import { display } from "@mui/system";
import User from "./user";

const generateUsers = (numUsers) => {
  return Array.from({ length: numUsers }, (_, index) => `user${index + 1}`);
};


const VoiceChat = ({ toggle, isServer }) => {
  const users = generateUsers(16);

  const getGridStyles = (num) => {
    const columnCount = Math.ceil(Math.sqrt(num));

    return {
      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    };
  };


  return (
    <>
      <StyledFlowBox sx={{height: '100%', backgroundColor: "black",  overflow: 'hidden', boxSizing: 'border-box'}}>
      <Box
       sx={{
        display: 'grid',
        gridTemplateColumns: getGridStyles(users.length),
        gap: 2,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
      >
        {users.map((user, index) => (
          <User key={index} name={user} />
        ))}
      </Box>
      </StyledFlowBox>
    </>
  );
};

export default VoiceChat;
