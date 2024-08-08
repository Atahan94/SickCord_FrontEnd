import { useSelector, useDispatch } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import { setActiveChat } from "../../../store/actions/serverActions";
import { setVoiceChat } from "../../../store/actions/userActions";
import {
  VolumeUpOutlined as VolumeUpOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  TagSharp as TagSharpIcon
} from "@mui/icons-material";
import {StyledListItem, StyledButtonBase, StyledButtonBase1} from "../../../materialUİElements/listMUİ"
import {
  ListItemIcon,
  ListItemText,
} from "@mui/material";


const ListItemChannel = ({data, serverId, groupID}) =>{
  const dispatch = useDispatch();
  const {name, type, _id} = data;
  
  

 /*  console.log("ListItem Data", data, serverId, "ISGROUP", groupID == ""? "No group" : "Group", "GroupID", groupID ) */
    return(
         <StyledListItem
          >
            <StyledButtonBase
              onClick={() =>{ console.log("name", name ,"serverId: ", serverId, "channelId", _id , "type", type)
                         dispatch(setActiveChat(serverId, _id, (groupID == ""? "": groupID)));
                         if(type === "voice") {dispatch(setVoiceChat(true, {id: _id, name: name}))}
              }}
              disableRipple
            >
              <ListItemIcon style={{ minWidth: 32 }}>
                {type === "voice"?<VolumeUpOutlinedIcon style={{ color: "white" }} fontSize="medium" /> : <TagSharpIcon style={{ color: "white" }} fontSize="medium"/>}
              </ListItemIcon>
              <ListItemText
                primary={name}
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
                  dispatch(setToggle("Channel","Edit", serverId, _id, (groupID == ""? "": groupID)))
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