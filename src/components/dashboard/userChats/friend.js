import { Typography, Box } from "@mui/material";
import ChatBubbleSharpIcon from '@mui/icons-material/ChatBubbleSharp';
import React from "react";

const Friend = ({data}) => {
  const {id, name} = data;
  
  const createChat = async () => { try {
    const response = await fetch(`https://sickcord-backend.onrender.com/user/createChat/${id}`, {
      method: "POST",
      credentials: "include",
    });

    const responseData = await response.json();
    
    window.location.reload();
    console.log("Friends", responseData.res);

    if (!response.ok) {
      throw new Error(responseData.code);
    }
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    /* console.log("Catch:", error.message); */
    console.log("Cannot create chat");
  }}
  

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
      <Typography sx={{ fontSize: "1.2rem" }}>
        {name}
      </Typography>
      <Box>
        <ChatBubbleSharpIcon
          sx={{
            color: "grey",
            fontSize: "1.8rem",
            "&:hover": {
              color: "white",
              cursor: "pointer",
            },
          }}
          onClick={createChat}
        />
      </Box>
    </Box>
  );
};

export default Friend;
