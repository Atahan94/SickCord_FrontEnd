import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from '../../store/actions/backdropActions';
import { setServers } from "../../store/actions/serverActions";
import { setToken } from "../../store/actions/authActions";
import { Tabs, Box} from "@mui/material";
import { TabsStyledBox, StyledTab } from "../../materialUİElements/sectionsMUİ";
import Server from "./server";
import UserChats from "./userChats";
import PropTypes from "prop-types";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";




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
  const {servers}= useSelector((state) => state.server)
  const navigate = useNavigate();

const getServers = async () => { try {
    const response = await fetch("http://localhost:3000/server/getAllServers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

   const responseData = await response.json();
   
  console.log("res type", responseData.res)

   dispatch(setServers(responseData.res))

    if (!response.ok) {
      throw new Error(responseData.code);
    }
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    /* console.log("Catch:", error.message); */
    console.log("Cannot get servers");
  }}

  const logOut = async () => { try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });

    const responseData = await response.json();
   
    console.log("res type", responseData.res)

    Cookies.remove("sessId")
    dispatch(setToken(null));

    navigate("/")
    if (!response.ok) {
      throw new Error(responseData.code);
    }
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    /* console.log("Catch:", error.message); */
    console.log("Cannot get servers");
  }}


 useEffect(() =>{
  getServers();
 }, []);

 useEffect(() => {
  console.log("Tap Panel Value", value, /* servers.length > 0 && (!(value -1 > servers.length) || !(value -1 < servers.length)? "activeServerID: " + servers[value - 1]._id : "No Active Server"), "Servers", servers */)
  
 }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue !== servers.length + 1 ? newValue : value);
  };
  return (
    <div className="dashboard">
      <h6 className="dashboard-title">SickCord</h6>
      <Box sx={{
        color:"white",
        fontSize: "12px",
        position: "absolute",
        right: "10px",
        marginTop: "6px",
        fontWeight: "700",
        cursor: "pointer"
      }}
      onClick={logOut}
      >Log Out</Box>
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
          {servers.length > 0 && servers.map((_, index) => (
            <StyledTab
              key={index + 1}
              icon={
                <>
                  <div className="server-tab-line" />
                  <img
                    src="./images/Ekrem_imaro.jpg"
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
          ))}
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
        {servers.length > 0 && servers.map((el, indx) => (
          <TabPanel value={value} index={indx + 1}>
          <Server serverData ={el} />
        </TabPanel>
        ))}
      </TabsStyledBox>
    </div>
  );
};

export default Dashboard;
