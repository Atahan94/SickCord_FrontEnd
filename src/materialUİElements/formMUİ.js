import {
    FormControl,
    TextField,
    Button,
    Box,
    useTheme,
  } from "@mui/material";
  import { styled } from "@mui/system";

export const ErrorBox = styled(Box)(() => {
  const curTheme = useTheme();
 return ({
    color: curTheme.palette.error.main,
  })});

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    color: 'white', // You can use specific color or reference the theme if needed
  }));
  

export const StyledButton = styled(Button)(() => ({
    marginTop: "50px",
  }));


export const StyledTextField = styled(TextField)(() => {
    const curTheme = useTheme();
    return `
    .MuiInputLabel-root {
      color: white
    }
    .MuiOutlinedInput-root {
      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: ${curTheme.palette.primary.light}; 
      }
    }
    .internal-autofill-selected{
      backgrounf-color: 
    }
    .MuiOutlinedInput-notchedOutline{
      border-color: white
    }
    .MuiInputBase-root{
      color: white
    }
    input:-internal-autofill-selected {
      background-color: transparent !important; 
    }
    .MuiInputBase-input{
      color: white;
    }
      display: inline,
      font-size: 12px,
      color: primary,
    `;
  });