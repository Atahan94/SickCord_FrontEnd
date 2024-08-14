import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../store/actions/backdropActions";
import { setServers } from "../../store/actions/serverActions";
import { setToken } from "../../store/actions/authActions";
import { setActiveChat, setUser } from "../../store/actions/userActions";
import { setFriends } from "../../store/actions/userActions";
import { Tabs, Box } from "@mui/material";
import { TabsStyledBox, StyledTab } from "../../materialUİElements/sectionsMUİ";
import Server from "./server";
import UserChats from "./userChats";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { initializeSocket } from "../../serverConnection/socket";
import { setSocket } from "../../store/actions/socketActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { servers } = useSelector((state) => state.server);
  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket.socket);
  const navigate = useNavigate();

  const getServers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/server/getAllServers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      console.log("res type", responseData.res);

      dispatch(setServers(responseData.res));

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      console.log("Cannot get servers");
    }
  };

  const getFriends = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/getFriends", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();

      console.log("Friends", responseData.res);

      dispatch(setFriends(responseData.res));

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      console.log("Cannot get friends");
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      
      const responseData = await response.json();

      console.log("res type", responseData.res);

      /*socket.emit("disconnect");*/
      
      dispatch(setToken(null));
      dispatch(setActiveChat(true));
      

      navigate("/");
      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      console.log("Cannot get servers");
    }
  };

  useEffect(() => {
    getServers();
    getFriends();
    
    const socketRefresh = async (name) => {
      if (socket == null) {
        const socketRE = await initializeSocket(name);
        dispatch(setSocket(socketRE));
      }
    };

    if (user.id == 0) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      dispatch(setUser(storedUser));
      socketRefresh(storedUser.name);
    }
   
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue !== servers.length + 1 ? newValue : value);
  };

  
  return (
    <div className="dashboard">
      <h6 className="dashboard-title">SickCord</h6>
      <Box
        sx={{
          color: "white",
          fontSize: "12px",
          position: "absolute",
          right: "10px",
          marginTop: "6px",
          fontWeight: "700",
          cursor: "pointer",
        }}
        onClick={logOut}
      >
        Log Out
      </Box>
      <TabsStyledBox>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            "& .MuiTabs-flexContainer": { alignItems: "flex-end" },
          }}
          TabIndicatorProps={{ style: { display: "none", alignItems: "end" } }}
          scrollButtons="off"
        >
          <StyledTab
            icon={
              <>
                <div className="server-tab-line" />
                <img
                  src="./images/friends-icon.png"
                  alt="Image"
                  className="server-tab-image"
                />
              </>
            }
            sx={{
              borderBottom: 1,
              borderBottomWidth: "3px",
              borderColor: "gray",
            }}
            isActive={value === 0} // This prop indicates whether the tab is active
            disableRipple={true}
            style={{ padding: "0", minWidth: 77, marginBottom: 10 }}
            {...a11yProps(0)}
          />
          {servers.length > 0 &&
            servers.map((_, index) => {
              return(
              <StyledTab
                key={index + 1}
                icon={
                  <>
                    <div className="server-tab-line" />
                    <img
                      src={_.image}/* "./images/Ekrem_imaro.jpg" */
                      alt="Image"
                      className="server-tab-image"
                    />
                  </>
                }
                isActive={value === index + 1} // This prop indicates whether the tab is active
                disableRipple={true}
                style={{ padding: "0", paddingBottom: 12, minWidth: 77 }}
                {...a11yProps(index + 1)}
              />
            )})}
          <StyledTab
            icon={
              <>
                <div className="server-tab-line" />
                <img
                  src="./images/8922789.png"
                  alt="Image"
                  className="server-tab-image"
                />
              </>
            }
            // This prop indicates whether the tab is active
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation(); // Prevent the default tab change behavior
              dispatch(setToggle("Server"));
            }}
            disableRipple={true}
            style={{ padding: "0", minWidth: 77, marginBottom: 10 }}
            {...a11yProps(value)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserChats />
        </TabPanel>
        {servers.length > 0 &&
          servers.map((el, indx) => (
            <TabPanel value={value} index={indx + 1}>
              <Server serverData={el} />
            </TabPanel>
          ))}
      </TabsStyledBox>
    </div>
  );
};

export default Dashboard;
