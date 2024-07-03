import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import {
  StyledFormControl,
  Item,
  StyledBackButton,
} from "../../../materialUİElements/backDropMUİ";
import { StyledFlowBox } from "../../../materialUİElements/sectionsMUİ";
import { StyledBox2 } from "../../../materialUİElements/sectionsMUİ";
import { ListUtility } from "../../dashboard/Uİ-utility/listUtility";
import ListItemUser from "../../dashboard/lists/listItemUser";
import { Typography, TextField, InputAdornment, Button } from "@mui/material";
import { Box } from "@mui/system";

const InvitePeople = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Item elevation={4} height = {65} >
        <StyledFormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              margin: "10px 10px 10px 10px",
              color: "white",
              fontSize: "25px",
            }}
          >
            İnvite People
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              margin: "5px 10px",
              color: "white",
              fontSize: "14px",
            }}
          >
            Invite Your Friends
          </Typography>
          <StyledBox2 sx={{height: "200px"}}>
            <ListUtility count={10}>
              <Box sx={{display: "flex", flexDirection: "row", marginTop:"10px"}}>
              <ListItemUser/>
              <Button
                    type="submit"
                    variant="contained" // Can be 'contained', 'outlined', etc.
                    size="small" // Smaller button to fit within the text field
                    sx={{margin: "15px 0px 15px 10px"}}
              >
                  Add
              </Button>
              </Box>
            </ListUtility>
          </StyledBox2>
          <TextField
            id="outlined-basic"
            label="URL of the server"
            variant="outlined"
            style={{
              bottom: "0",
              left: "0",
              width: "90%",
              marginTop: "45px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained" // Can be 'contained', 'outlined', etc.
                    size="small" // Smaller button to fit within the text field
                  >
                    Add
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <StyledBackButton
            onClick={() => {
              dispatch(setToggle(""));
            }}
          >
            Back
          </StyledBackButton>
        </StyledFormControl>
      </Item>
    </>
  );
};

export default InvitePeople;
