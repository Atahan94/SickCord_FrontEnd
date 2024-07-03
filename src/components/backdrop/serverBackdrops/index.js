import React, {useState} from "react";
import {
  Item,
  StyledButton
} from "../../../materialUİElements/backDropMUİ";
import { Box} from "@mui/material";
import CreateServer from "./createServer";
import JoinServer from "./joinServer";



const CreateOrJoinServer = () => {
  const [create, setCreate] = useState()
  const [join, setJoin] = useState()

  
  
const setBackdrop = (join = false, create = false) => {
    setJoin(join);
    setCreate(create)
  }
  
  

  return (
    <>
      {!create && !join && (
      <Item elevation={4}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
      }}>
        <StyledButton onClick={() => { setBackdrop(false, true) }}>
          Create My Own
        </StyledButton>
        <StyledButton onClick={() => { setBackdrop(true, false)}}>
          Join a Server
        </StyledButton>
        </Box>
      
      </Item>)}
      {
        create && <CreateServer back={() =>{setBackdrop()}}/> 
       }
       {
        join && <JoinServer back={() =>{setBackdrop()}}/> 
       }
    </>
  );
};

export default CreateOrJoinServer;
