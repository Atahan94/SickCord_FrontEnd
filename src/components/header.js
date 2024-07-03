import {Box, AppBar, Toolbar} from "@mui/material"
//import { width } from "@mui/system";

const Header = ({ Link }) => {
 
  
  return (
   <>
   <Box style={{ width: "100%" }}>
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "center", gridGap: "55px"}}>
        <Link to="/" style={{ textDecoration: 'none' }} >
                <Box style={{ color: "white"}}>Login</Box>
                </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }} >
                <Box style={{ color: "white"}}>SignUp</Box>
                </Link>
      </Toolbar>
    </AppBar>
  </Box>
  <h1 className='main_title'>SickCord</h1>
  </>
  );
};

export default Header;
