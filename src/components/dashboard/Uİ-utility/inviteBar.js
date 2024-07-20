import React from 'react'
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ListItemUser from '../lists/listItemUser';

const InviteBar = ({data, serverID, invite}) => {

    console.log("INVİTE DATAS", data, "ServerID", serverID)
  return (
    <Box sx={{display: "flex", flexDirection: "row", marginTop:"10px"}}>
    <ListItemUser data={{with:{name: data.name}}}/>
    <Button
          variant="contained" // Can be 'contained', 'outlined', etc.
          size="small" // Smaller button to fit within the text field
          sx={{margin: "15px 0px 15px 10px"}}
          onClick={() => {console.log("User:", data.name,"ServerID:", serverID); invite(data.name)}}
    >
        Add
    </Button>
    </Box>
  )
}

export default InviteBar
