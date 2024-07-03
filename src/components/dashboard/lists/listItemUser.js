

import { Typography, Box } from "@mui/material";
import { StyledBox } from "../../../materialUİElements/sectionsMUİ";

const ListItemUser = ({ hovarable, toggle }) => {
  return (
    <StyledBox hoverable={hovarable} onClick={toggle}>
      <Box style={{ display: "flex" }}>
        <img
          src="./images/8922789.png"
          alt="Image"
          className="channel-tab-user-image"
        />
        <Typography>User Name</Typography>
      </Box>
    </StyledBox>
  );
};

export default ListItemUser;
