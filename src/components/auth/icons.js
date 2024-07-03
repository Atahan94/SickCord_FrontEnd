import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    IconButton
  } from "@mui/material";
  
export const VisibilityIcon = ({toggle, action}) =>{
    return (
      <IconButton
      aria-label="toggle password visibility"
      onClick={action}
      edge="end"
      style={{ color: "white" }}
    >
      {toggle ? <VisibilityOff /> : <Visibility />}
    </IconButton>
    )
  }