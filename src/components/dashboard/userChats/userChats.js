import { Typography, Box } from "@mui/material";
import ListItemUser from "../lists/listItemUser";
import { ListUtility } from "../Uİ-utility/listUtility";
import React from "react";

const UserChats = ({toggle}) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
      }}
      >
      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px" }}
        >
          Direct Messages
        </Typography>
      </Box>
      <ListUtility count={10}>
        <ListItemUser toggle={toggle} hovarable={true}/>
      </ListUtility>
    </Box>
  );
};

export default UserChats;
