import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ListUtility } from "../../Uİ-utility/listUtility";

const UserProfile = ({data}) => {
 // `${data.name} Friend & ${data.name}  Server`
   console.log("USER PROFİLE", data)  
  const profileİnfo = [
    {
      primaryText: data.name,
      subText: data.name,
    },
    {
      primaryText: "Common Servers and friend",
      subText: `${data.mutualFriends.length} Friend & ${data.mutualServers.length}  Server`,
    },
    {
      primaryText: "Since this date member of the Sickcord:",
      subText: data.createdAt,
    },
  ];
  const passContent = (content, value) => {
    return {
      key: value,
      primary: content?.primaryText || "Default Primary Text",
      secondary: (
        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
          >
            {content?.subText || "Default Sub Text"}
          </Typography>
        </React.Fragment>
      ),
    };
  };
  const contentsToPass = {
    content: [...profileİnfo],
    pass: passContent,
  };
  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 150, height: 150 }}
      />
      <ListUtility
        sx={{
          maxWidth: 360,
          bgcolor: "black",
          width: "80%",
          marginTop: "25px",
          borderRadius: "8px",
        }}
        count={5}
        content={contentsToPass}
        passToChild={true}
      >
        <ListItem alignItems="flex-start">
          <ListItemText
            sx={{ color: "white" }}
            primary="Name of the User"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                >
                  Name of the User or his/her server
                </Typography>
              </React.Fragment>
            }
            secondaryTypographyProps={{
              color: "lightgray", // Apply styles to the entire secondary text
              fontSize: "14px", // Example font size for secondary text
              margin: "5px", // Additional styling if needed
            }}
          />
          <Divider
            variant="inset"
            component="li"
            sx={{ borderColor: "#3c3b3b", margin: "0px 10px" }}
          />
        </ListItem>
      </ListUtility>
    </>
  );
};

export default UserProfile;
