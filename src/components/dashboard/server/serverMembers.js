import { Typography, Box} from "@mui/material";
import ListItemUser from "../lists/listItemUser";
import {StyledBox2} from "../../../materialUİElements/sectionsMUİ";
import { ListUtility } from "../Uİ-utility/listUtility";
import { useEffect, useState } from "react";


const ServerMembers = ({serverID}) => {
  const [members, setMembers] = useState({
    online:[],
    offline:[],
  })

  const getAllMembers = async () => {
    try {
      const response = await fetch(
        `https://sickcord-backend.onrender.com/server/getAllMembers/${serverID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();


      if (!response.ok) {
        throw new Error(response);
      }
      console.log("MEMBERS RECEİVED",responseData.res);
      setMembers(responseData.res)
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      /* throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down"); */
    }
  };
 console.log("MEMBERS",  members)
  useEffect(() =>{
    getAllMembers();
   }, []);

  const passData = (datas) => ({
    data: {with:{name: datas.name}, image: datas.image},
  });
  return (
    <StyledBox2
      sx={{
        marginTop: "60px",
      }}
      >
      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px" }}
        >
          Online
        </Typography>
      </Box>
      { members.online.length > 0 ?<ListUtility content={{content: members.online, pass: passData}} passToChild = {false} sx={{color: "green"}}>
        <ListItemUser/>
      </ListUtility>: <Typography>No Online</Typography>}
      

      <Box display={"flex"}>
        <Typography
          sx={{ cursor: "pointer", color: "white", fontSize: "15px", marginLeft:"10px"  }}
        >
          Offline 
        </Typography>
      </Box>
      {members.offline.length > 0 ?<ListUtility content={{content: members.offline, pass: passData}} passToChild = {false}>
        <ListItemUser/>
      </ListUtility>: <Typography>No members</Typography>}
    </StyledBox2>
  );
};

export default ServerMembers;
