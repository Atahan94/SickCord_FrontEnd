import { Typography, Box } from "@mui/material";
import { StyledBox } from "../../../materialUİElements/sectionsMUİ";
import { useDispatch } from "react-redux";
import { setActiveChat } from "../../../store/actions/userActions";

const ListItemUser = ({ hovarable, data }) => {
  const dispatch = useDispatch();
  /* console.log("ListItemUser", data); */
  return (
    <StyledBox hoverable={hovarable} onClick={() => {dispatch(setActiveChat(false, data))}}>
      <Box style={{ display: "flex" }}>
        <img
          src={data.image}
          alt="Image"
          className="channel-tab-user-image"
        />
        <Typography sx={{fontSize: "1rem"}} >{data ===undefined? "User Name": data.with.name}</Typography>
      </Box>
    </StyledBox>
  );
};

export default ListItemUser;
