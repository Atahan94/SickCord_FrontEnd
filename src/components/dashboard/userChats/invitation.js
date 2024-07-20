import { Typography, Box } from "@mui/material";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import React from "react";

const Invitation = ({data}) => {
  const {_id, name, type} = data;

  if(type === "server"){
    console.log("Invitation",_id, name, type)
  }
  
  const respondInvitation = async (accept) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/respondInvitation/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accept, type, name }),
          credentials: "include",
        }
      );

      const responseData = await response.json();
      window.location.reload();

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      console.log("Catch:", error.message);
      throw new Error(error.message);
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: "70px",
        marginTop: "15px",
        borderBottom: 2,
        borderColor: "divider",
      }}
    >
      <Typography sx={{ fontSize: "1.5rem" }}>
        {name}
      </Typography>
      <Box>
        <CheckCircleSharpIcon
          sx={{
            color: "green",
            fontSize: "2.2rem",
            "&:hover": {
              color: "lightgreen",
              cursor: "pointer",
            },
          }}
          onClick={() => {respondInvitation(true)}}
        />
        <CancelSharpIcon
          sx={{
            color: "red",
            fontSize: "2.2rem",
            "&:hover": {
              color: "pink",
              cursor: "pointer",
            },
          }}
          onClick={() => {respondInvitation(false)}}
        />
      </Box>
    </Box>
  );
};

export default Invitation;
