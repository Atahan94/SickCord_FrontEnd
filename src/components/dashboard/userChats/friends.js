import { useSelector, useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import Friend from "./friend";
import { ListUtility } from "../Uİ-utility/listUtility";
import { StyledFlowBox } from "../../../materialUİElements/sectionsMUİ";
import React from "react";

const Friends = () => {
  const {friends} = useSelector((state) => state.user)

  const passData = (datas) => ({
    data: datas,
  });

 
  
  return (
    <Box>
      <Box
        sx={{
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ borderBottom: 2, borderColor: "ActiveBorder" }}
        >
          Friends
        </Typography>
        <StyledFlowBox sx={{maxHeight:"500px"}}>
       {friends.length > 0 ? <ListUtility content={{content: friends, pass: passData}} passToChild={false}>
          <Friend />
        </ListUtility> : <Typography>You have no friends</Typography>}
        </StyledFlowBox>
      </Box>
    </Box>
  );
};

export default Friends;
