import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Invitation from "./invitation";
import { ListUtility } from "../Uİ-utility/listUtility";
import { StyledFlowBox } from "../../../materialUİElements/sectionsMUİ";
import React from "react";

const UserInvitations = () => {
  const [invitations, setInvitations] = useState({
    user: [],
    server: [],
  });

  const passData = (datas) => ({
    data: datas,
  });

  useEffect(() => {
    getInvitations();
  }, []);

  const getInvitations = async () => {
    try {
      const response = await fetch(
        `https://sickcord-backend.onrender.com/user/getInvitations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      const isEqual =
        JSON.stringify(invitations) === JSON.stringify(responseData);
      if (!isEqual) {
        setInvitations(responseData);
      }

      if (!response.ok) {
        throw new Error(responseData.code);
      }
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      console.log("Catch:", error.message);
      throw new Error(error.message);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ borderBottom: 2, borderColor: "ActiveBorder" }}
        >
          User Invitations
        </Typography>
        <StyledFlowBox
        sx={{
          maxHeight:"240px"
        }}
      >
     {invitations.user.length > 0 ? <ListUtility content={{content: invitations.user, pass: passData}} passToChild={false}>
          <Invitation />
        </ListUtility> : <Typography>There is no invitation</Typography>}
        </StyledFlowBox>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ borderBottom: 2, borderColor: "ActiveBorder" }}
        >
          Server Invitations
        </Typography>
        <StyledFlowBox
        sx={{
          maxHeight:"240px"
        }}
      >
         {/* <ListUtility count={15}>
         <Typography>There is no invitation</Typography>
        </ListUtility> */}
        {invitations.server.length > 0 ? <ListUtility content={{content: invitations.server, pass: passData}} passToChild={false}>
          <Invitation />
        </ListUtility> : <Typography>There is no invitation</Typography>}
        </StyledFlowBox>
      </Box>
    </Box>
  );
};

export default UserInvitations;
