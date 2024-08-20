import React from "react";
import { useSelector} from "react-redux";
import { useState} from "react";
import { Box, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import UserInvitations from "./userInvitations";
import AddFriend from "./addFriend";
import Friends from "./friends";


const UserFriends = () => {
  const [value, setValue] = useState('1');
  const {friends, onlineFriends} = useSelector((state) => state.user)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  
  return (
    <>
     <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="Online" value="1" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="All" value="2" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "lightgray",
                    }}} label="Waiting" value="3" />
            <Tab sx={{"&:hover": {
                      backgroundColor: "darkgreen",
                    },
                    color:"green"
                    }} label="Add Friend" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><Friends friends={onlineFriends}/></TabPanel>
        <TabPanel value="2"><Friends friends={friends}/></TabPanel>
        <TabPanel value="3"><UserInvitations/></TabPanel>
        <TabPanel value="4"><AddFriend/></TabPanel>
      </TabContext>
    </Box>
     
    </>
  );
};

export default UserFriends;
