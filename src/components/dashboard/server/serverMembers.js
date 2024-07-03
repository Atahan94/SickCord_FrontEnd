import { Typography, Box} from "@mui/material";
import ListItemUser from "../lists/listItemUser";
import {StyledBox2} from "../../../materialUİElements/sectionsMUİ";
import { ListUtility } from "../Uİ-utility/listUtility";
import React from "react";


const ServerMembers = () => {
  return (
    <StyledBox2
      sx={{
        marginTop: "60px",
      }}
      >
      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px" }}
        >
          Online
        </Typography>
      </Box>
    
      <ListUtility count={5} sx={{color: "green"}}>
        <ListItemUser/>
      </ListUtility>

      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px"  }}
        >
          Offline 
        </Typography>
      </Box>
      <ListUtility count={5}>
        <ListItemUser/>
      </ListUtility>
    </StyledBox2>
  );
};

export default ServerMembers;
