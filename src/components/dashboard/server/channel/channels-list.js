import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../../store/actions/backdropActions";
import ListItemChannel from "../../lists/listItemChannel";
import { KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon } from "@mui/icons-material";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { ListUtility } from "../../Uİ-utility/listUtility";
import { Typography, Box } from "@mui/material";



const ChannelList = ({datas, isGroup, groupName, serverId, groupID}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dispatch = useDispatch();

  
  const passData = (item, id, groupID = "") => ({
    data: item,
    serverId: id,
    groupID: groupID
  });
   
  return (
    <>
      {isGroup === true ? (
        <>
        <Box sx={{ cursor: "pointer", display: "flex", width: "100%"}}  onClick={() => setIsListVisible(!isListVisible)}>
        <KeyboardArrowDownOutlinedIcon
              fontSize="small"
              sx={{
                transform: `rotate(${isListVisible ? 270 : 0}deg)`,
                marginRight: "3px", // Space between icon and text
                marginLeft: "1px",
              }}
            />
          <Typography
           
            sx={{ cursor: "pointer", color: "white", fontSize:"15px", width: "75%" }}
            
          >
            {groupName}
          </Typography>
          <Box
        component={AddSharpIcon}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setToggle("Channel", "Channel", serverId, "", groupID ))
        }}
        sx={{
          position: 'relative',
          right: "0px",
          cursor: 'pointer',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change this to your desired hover background color
            borderRadius: '50%', // Optional: to make it a circular background
          },
        }}
      />
          </Box>
          {isListVisible && (
            <ListUtility sx={{ width: "91%", left: "21px" }} content={{content: datas, pass: passData, serverId: serverId, groupID: groupID}} passToChild={false}>
              <ListItemChannel/>
            </ListUtility>
          )}
        </>
      ) : (
        <ListUtility sx={{ width: "91%", left: "21px" }} content={{content: datas, pass: passData, serverId: serverId}} passToChild={false}>
          <ListItemChannel/>
        </ListUtility>
      )}
    </>
  );
};

export default ChannelList;
