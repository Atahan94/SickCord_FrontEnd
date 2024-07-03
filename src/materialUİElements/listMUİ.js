import { styled } from '@mui/system';
import {
    ListItem,
    ButtonBase,
  } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    display: "flex",
    borderRadius: "8px",
    justifyContent: "space-between",
    padding: "0px",
    margin: "10px 0px",
    transition: "all 0.3s", // Smooth transitions for hover effects
    "&:hover > .hidden-icon": {
      opacity: 1, // Make the hidden icon visible on hover
      // Adjust position to bring it into view
    },
    "&:hover": {
      backgroundColor: "#8c8a8a7d;",
    },
}));
export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  width: "100%", // Ensure the button base spans the entire ListItem
  transition: "background-color 0.3s",
}));

export const StyledButtonBase1 = styled(ButtonBase)(({ theme }) => ({
  opacity: 1, // Initially hidden
  transition: "opacity 0.2s",
}));


