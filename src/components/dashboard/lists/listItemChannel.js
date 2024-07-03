import {
  VolumeUpOutlined as VolumeUpOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
} from "@mui/icons-material";

import {StyledListItem, StyledButtonBase, StyledButtonBase1} from "../../../materialUİElements/listMUİ"

import {
  ListItemIcon,
  ListItemText,
} from "@mui/material";


const ListItemChannel = () =>{
    return(
         <StyledListItem
          >
            <StyledButtonBase
              onClick={() => console.log("ListItem clicked")}
              disableRipple
              
            >
              <ListItemIcon style={{ minWidth: 32 }}>
                <VolumeUpOutlinedIcon style={{ color: "white" }} fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
                style={{ textAlign: "left" }}
                primaryTypographyProps={{
                  fontSize: "15px", // Adjust the font size
                  color: "white", // You can also set text color here
                }}
              />
            </StyledButtonBase>
            <StyledButtonBase1
                className="hidden-icon"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent click event from bubbling
                  console.log("Settings Icon Clicked"); // Inner button click handler
                }}
                disableRipple
              > 
            <ListItemIcon style={{ minWidth: 38 }}>
              <SettingsOutlinedIcon style={{ color: "white" }} fontSize="small" />
            </ListItemIcon>
            </StyledButtonBase1> 
          </StyledListItem>
    )
}

export default ListItemChannel;