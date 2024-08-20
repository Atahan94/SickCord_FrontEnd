import { StyledFlowBox } from "../../../materialUİElements/sectionsMUİ";
import { Box } from "@mui/material";
import User from "./user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const VoiceChat = ({type}) => {
  const { voiceChat } = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket.socket);
  const [connectedMembers, setConnectedMembers] = useState([]);

  
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  useEffect(() => {
    socket.on("updateMembers", (users) => {
      console.log("CONNECTED", users, "COMPARE CONNECTED", arraysEqual(users, connectedMembers));
      if (!arraysEqual(users, connectedMembers)) {
        setConnectedMembers(users);
      }
    });
    return () => {
      socket.off("updateMembers");
    };
  },[voiceChat]);

  const getGridStyles = (num) => {
    const columnCount = Math.ceil(Math.sqrt(num));

    return {
      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    };
  };

  return (
    <>
      <StyledFlowBox
        sx={{
          height: "100%",
          backgroundColor: "black",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: getGridStyles(connectedMembers.length),
            gap: 2,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {connectedMembers.length > 0 ?
            connectedMembers.map((user, index) => (
              <User key={index} name={user} />
            )): <h6>No Users</h6>}
        </Box>
      </StyledFlowBox>
    </>
  );
};

export default VoiceChat;
