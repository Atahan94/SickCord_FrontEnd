import {
  Paper,
  Box,
  FormControl,
  Button
} from "@mui/material";
import { styled } from "@mui/system";
import AddAPhotoSharpIcon from "@mui/icons-material/AddAPhotoSharp";

export const Item = styled(Paper)(({ theme, height = 50 }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  "&.MuiPaper-root": {
    height: `${height}% !important`,
    width: "27% !important",
    borderRadius: "8px !important",
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  border: "3px solid white", // Set border width and style
  borderColor: theme.palette.divider, // Set border color, you can replace with a specific color
  borderRadius: "100px", // Set border radiu // Add padding for inner spacing
  textAlign: "center", // Optional text alignment
  color: theme.palette.text.primary, // Set text color
  width: "25%",
  height: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
    cursor: "pointer",
  },
}));

export const StyledIcon = styled(AddAPhotoSharpIcon)(({ theme }) => ({
  fontSize: "40px", // Set font size explicitly
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "15px 0px 15px 0px", // Set font size explicitly
  margin: "15px 25px 15px 25px",
  color:"white"
}));
export const StyledBackButton = styled(Button)(({ theme }) => ({
  position:"absolute", // Set font size explicitly
  bottom: "19px",
  left:"16px",
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
}));
