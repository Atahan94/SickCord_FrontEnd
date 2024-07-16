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

const NoChannel = ({ toggle, isServer }) => {
  const user = ["user1", "user2", "user3"];

  return (
    <>
      <StyledFlowBox>
        <h1>There No Channel to Join</h1>
      </StyledFlowBox>
    </>
  );
};

export default NoChannel;
