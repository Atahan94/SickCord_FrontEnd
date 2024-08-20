import { useState } from "react";
import React from "react";
import ChannelList from "./channels-list";
import { StyledBox1, StyledBox2} from "../../../../materialUİElements/sectionsMUİ";
import UserBar from "../../Uİ-utility/userBar";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../../store/actions/backdropActions";
import {
  KeyboardArrowDownOutlined as KeyboardArrowDownOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
  AddCircleOutlined as AddCircleOutlinedIcon,
  LibraryAddOutlined as LibraryAddOutlinedIcon,
  PersonAddAltOutlined as PersonAddAltOutlinedIcon,
  DeleteForeverSharp as DeleteForeverSharpIcon
} from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";


const ChannelSection = ({name, serverId, channels, groups, owner}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const dispatch = useDispatch();
  

  const delServer = async () => {
    try {
      const response = await fetch(`https://sickcord-backend.onrender.com/server/delete/${serverId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      console.log(responseData);
      window.location.reload();
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      console.log("Catch:", error);
      /* throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down"); */
    }
  }

  const pages = [
    {
      text: "Invite People",
      icon: <PersonAddAltOutlinedIcon />,
      subType: "Invite",
      onClickHandler: (subType) =>{handleCloseNavMenu(); dispatch(setToggle("Channel", subType, serverId));}
    },
    {
      text: "Create Channel",
      icon: <AddCircleOutlinedIcon />,
      subType: "Channel",
      onClickHandler: (subType) =>{handleCloseNavMenu(); dispatch(setToggle("Channel", subType, serverId));}
    },
    {
      text: "Create Group",
      icon: <LibraryAddOutlinedIcon />,
      subType: "Group",
      onClickHandler: (subType) =>{handleCloseNavMenu(); dispatch(setToggle("Channel", subType, serverId));}
    },
  ];

  if (owner) {
    pages.push({
      text: "Delete Server",
      icon: <DeleteForeverSharpIcon />,
      subType: "None",
      onClickHandler: () => { delServer(); }
    });
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
        <StyledBox1
          sx={{
            justifyContent: "space-between",
          }}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          backgroundColor={
            Boolean(anchorElNav) ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)"
          }
        >
          <Typography>{name}</Typography>
          {anchorElNav == null ? (
            <KeyboardArrowDownOutlinedIcon
              sx={{
                marginRight: "5px",
              }}
            />
          ) : (
            <CloseOutlinedIcon
              sx={{
                marginRight: "5px",
              }}
            />
          )}
        </StyledBox1>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block" },
          }}
          PopoverClasses={{
            paper: "custom-menu-paper", // Apply a custom CSS class to the paper element
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.text}
              onClick={()=>{page.onClickHandler(page.subType)}}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#262675")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                 /* "&:hover": {
                    backgroundColor: "white" // Different hover color for each item
                  }, */
              }}
            >
              <Typography textAlign="center">{page.text}</Typography>
              {page.icon}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <StyledBox2
      sx={{height: "70vh"}}
      >
       <ChannelList isGroup = {false} datas={channels} serverId={serverId}/>
       {groups.length > 0? groups.map((el) => <ChannelList key={el._id} isGroup = {true} groupName={el.name} datas={el.channels} groupID={el._id} serverId={serverId}/>): ""}
       </StyledBox2>
       <UserBar/>
    </>
  );
};

export default ChannelSection;
