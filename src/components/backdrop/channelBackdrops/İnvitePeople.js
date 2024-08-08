import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../../store/actions/backdropActions";
import {
  StyledFormControl,
  Item,
  StyledBackButton,
} from "../../../materialUİElements/backDropMUİ";
import { StyledBox2 } from "../../../materialUİElements/sectionsMUİ";
import InviteBar from "../../dashboard/Uİ-utility/inviteBar";
import { ListUtility } from "../../dashboard/Uİ-utility/listUtility";
import { Typography, TextField, InputAdornment, Button } from "@mui/material";



const InvitePeople = ({id}) => {
  const [friendsNotMember, setFriendsNotMember] = useState([]);
  const dispatch = useDispatch();
  const {friends} = useSelector((state) => state.user);
  const {servers} = useSelector((state) => state.server);

  useEffect(()=> {
    const server = servers.find((server) => server._id === id);
    const newFriendsArray = friends.filter(friend => !server.members.includes(friend.id));
    setFriendsNotMember(newFriendsArray)
  },[])



  const passData = (datas, id) => ({
    data: datas,
    serverID: id,
    invite: inviteMember
  });

  const inviteMember = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:3000/server/${id}/addMember/${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(response);
      }
      console.log(responseData);
      // Optionally, you can return any data returned by the server (e.g., user information)
    } catch (error) {
      /* console.log("Catch:", error.message); */
      /* throw error.message === "0"
        ? new Error(`User name or Password is wrong`)
        : new Error("Server is Down"); */
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("memberName");

    try {
     const channelİnfo = await inviteMember(name); // Call your loginUser function with form data
      
      /* window.location.reload(); */

      // Redirect to login page after successful sign-up
    } catch (error) {
      /* console.error("Error signing up:", error); */
      console.log(error);
      // Handle error (e.g., display error message to user)
    }
  };


  console.log("BACKDROP INVİTE FRİENDS", friends)

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
          onSubmit={handleSubmit}
          component="form"
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
            <ListUtility content={{content: friendsNotMember, pass: passData, serverId: id}} passToChild = {false}>
             <InviteBar/>
            </ListUtility>
          </StyledBox2>
          <TextField
            id="outlined-basic"
            label="Name of the member"
            name="memberName"
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
