import { Typography, Box } from "@mui/material";
import ListItemUser from "../lists/listItemUser";
import { ListUtility } from "../Uİ-utility/listUtility";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../../store/actions/userActions";
import React, { useEffect } from "react";

const UserChats = () => {
  const dispatch = useDispatch(); 
 
  const {friendsChatS} = useSelector((state) => state.user);

  

  const passData = (datas) => ({
    data: datas,
  });

  
  const getChats = async () => { try {
    const response = await fetch(`https://sickcord-backend.onrender.com/user/getChats`, {
      method: "GET",
      credentials: "include",
    });

    const responseData = await response.json();
   
    /* console.log("CHATS", responseData.res); */

    if (!response.ok) {
      throw new Error(responseData.code);
    }

    dispatch(setChats(responseData.res))
    // Optionally, you can return any data returned by the server (e.g., user information)
  } catch (error) {
    /* console.log("Catch:", error.message); */
    console.log("Cannot create chat");
  }}

  useEffect(() =>{
   getChats()
  }, [])

  return (
    <Box
      sx={{
        marginTop: "20px",
      }}
      >
      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px" }}
        >
          Direct Messages
        </Typography>
      </Box>
      {friendsChatS.length > 0 && <ListUtility content={{content: friendsChatS, pass: passData}} passToChild = {false}>
        <ListItemUser  hovarable={true}/>
      </ListUtility>}
    </Box>
  );
};

export default UserChats;
