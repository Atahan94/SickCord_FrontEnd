import { useState } from "react";
import React from "react";
import ListItemChannel from "../../lists/listItemChannel";
import { KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon } from "@mui/icons-material";
import { ListUtility } from "../../Uİ-utility/listUtility";
import { Typography, List, Box } from "@mui/material";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const ChannelList = (prop) => {
  const [isListVisible, setIsListVisible] = useState(false);
  return (
    <>
      {prop.isGroup === true ? (
        <>
        <Box display={"flex"}>
        <KeyboardArrowDownOutlinedIcon
              fontSize="small"
              sx={{
                transform: `rotate(${isListVisible ? 270 : 0}deg)`,
                marginRight: "3px", // Space between icon and text
                marginLeft: "1px",
              }}
            />
          <Typography
            onClick={() => setIsListVisible(!isListVisible)}
            sx={{ cursor: "pointer", color: "white", fontSize:"15px" }}
            
          >
            {prop.groupName}
          </Typography>
          </Box>
          {isListVisible && (
            <ListUtility count={5} sx={{ width: "91%", left: "21px" }}>
              <ListItemChannel/>
            </ListUtility>
          )}
        </>
      ) : (
        <ListUtility count={5} sx={{ width: "91%", left: "21px" }}>
          <ListItemChannel/>
        </ListUtility>
      )}
    </>
  );
};

export default ChannelList;
