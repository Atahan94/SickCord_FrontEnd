import {
  Box
} from "@mui/material";


const User = ({ name, size }) => {


  return (
    <Box
    sx={{
        margin: "15px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
      }}
    >
      {name}
    </Box>
  );
};

export default User;
