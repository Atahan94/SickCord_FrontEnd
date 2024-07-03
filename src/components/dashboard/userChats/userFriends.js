import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import {
  StyledFlowBox,
  StyledFlowBox1,
} from "../../../materialUİElements/sectionsMUİ";
const UserFriends = () => {
  const navButtons = [
    {
      text: "Online",
      action: function () {
        console.log(this.text); // this now refers to the object context
      },
    },
    {
      text: "All",
      action: function () {
        console.log(this.text); // this now refers to the object context
      },
    },
    {
      text: "Waiting",
      action: function () {
        console.log(this.text); // this now refers to the object context
      },
    },
    {
      text: "Add Friend",
      action: function () {
        console.log(this.text); // this now refers to the object context
      },
    },
  ];
  return (
    <>
      <StyledFlowBox
        sx={{
          display: "flex",
        }}
      >
        <StyledFlowBox1
          sx={{
            justifyContent: "flex-start",
          }}
        >
          <Typography sx={{ color: "white", marginLeft: "15px" }}>
            Friends
          </Typography>
          <Divider />
          <Box sx={{ marginLeft: "50px" }}>
            {navButtons.map((el, index) => {
              return (
                <Button
                  key={index}
                  onClick={el.action}
                  sx={{
                    color: el.text === "Add Friend" ? "white" : "gray",
                    backgroundColor:
                      el.text === "Add Friend" ? "green" : "transparent",
                    marginRight: "15px",
                    "&:hover": {
                      backgroundColor:
                        el.text === "Add Friend" ? "darkgreen" : "lightgray",
                    },
                  }}
                >
                  {el.text}
                </Button>
              );
            })}
          </Box>
        </StyledFlowBox1>
        <Box sx={{ marginTop: "45px", width: "100%" }}>List of Users</Box>
      </StyledFlowBox>
    </>
  );
};

export default UserFriends;
