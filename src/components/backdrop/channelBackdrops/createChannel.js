import React from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import {
  StyledFormControl,
  Item,
  StyledBackButton,
} from "../../../materialUİElements/backDropMUİ";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";

const CreateChannel = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Item elevation={4}>
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
              margin: "15px 10px 25px 10px",
              color: "white",
              fontSize: "30px",
            }}
          >
            Create Channel
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
            Type Of Channel
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="text"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="text"
              control={<Radio />}
              label="Text"
            />
            <FormControlLabel value="voice" control={<Radio />} label="Voice" />
          </RadioGroup>
          <TextField
            id="outlined-basic"
            label="Name Of The Channel"
            variant="outlined"
            style={{
              bottom: "0",
              left: "0",
              width: "90%",
              marginTop: "20px",
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

export default CreateChannel;
