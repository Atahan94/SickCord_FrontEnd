import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  StyledFlowBox,
  StyledFlowBox1,
  StyledButtonBase,
} from "../../../materialUİElements/sectionsMUİ";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';



const Flow = ({ toggle, isServer, serverId, data }) => {
  
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [channelName, setChannelName] = useState("");

  const socket = useSelector(state => state.socket.socket);
 

  useEffect(() => {
    setCurrentMessage("");
    setChatMessages([]);
    let group, name, _id;

    console.log("FLOW DATA", data)

    if (isServer) {
      ({ group, name, _id } = data);

    } else {
      ({ name, _id } = data);
    }
    setChannelName(name);


    if (isServer) {
      socket.emit("joinServerChannel", {
          serverId,
          channelId: _id,
          groupId: group,
      });
  } else {
      socket.emit("joinPrivateChat", { _id, name });
  }

    socket.on("getAllMessages", (data) =>{
     const messages = data.map((el) => {return {message: el.text, hash: el.hash }})
      console.log("All messages",messages);
      setChatMessages(messages.reverse())
    })


    socket.on("receiveMessage", (data) =>{
      const message = {message: data.text, hash: data.hash}
      setChatMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => msg.hash === message.hash);
        if (!messageExists) {
          // Eğer mesaj yoksa, mesajı ekle
          console.log("messages is not exists")
          return [message, ...prevMessages];
        }
        console.log("messages is exists", prevMessages, message)
        return prevMessages;
      });
    })


    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("getAllMessages");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [data]);
  
  const handleInputChange = (event) => {
    const newMessageObj = {
      message: event.target.value,
      hash: uuidv4(), // Benzersiz bir hash oluşturur
    };
    setCurrentMessage(newMessageObj);
  };

  const handleSendMessage = (e) => {
    e.stopPropagation();
    console.log("MESSAGE")
    if (currentMessage.message.trim()) {
      const messageData = {
        message: currentMessage.message,
        hash: currentMessage.hash,
      };
      // Emit the message to the server
      const listener = isServer? "serverMessage": "privateMessage"
      socket.emit(listener, messageData);

      // Add the new message to the chat flow
      setChatMessages([currentMessage, ...chatMessages]);
      setCurrentMessage({ message: "", hash: "" }); // Clear the input field
    }
  };

  return (
    <>
      <Box sx={{height: "90%"}}>
        <StyledFlowBox1 sx={{zIndex: 10}}>
          <Typography sx={{ color: "white", marginLeft: "15px" }}>
            {channelName ? channelName : "Name Of the User"}
          </Typography>
          <Box>
            <StyledButtonBase
              onClick={toggle}
              sx={{
                margin: "0px 10px",
              }}
            >
              {isServer === true ? (
                <PeopleOutlinedIcon style={{ color: "white" }} />
              ) : (
                <AccountCircleOutlinedIcon style={{ color: "white" }} />
              )}
            </StyledButtonBase>
            <TextField
              label="Filled"
              variant="filled"
              style={{ left: "0", marginRight: "20px" }}
              InputProps={{
                // Change the height by adjusting the padding and font size
                sx: {
                  height: "31px", // Change the height of the TextField
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon style={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                // Adjust the label's position to align with the new height
                sx: {
                  top: "-11px", // Adjust the label's top position
                },
              }}
            />
          </Box>
        </StyledFlowBox1>
        <StyledFlowBox sx={{maxHeight:"82vh", paddingTop: "3.5%", display:"flex", flexDirection:"column-reverse" }}>
        {chatMessages.map((msg, index) => (
          <Typography key={index} sx={{marginTop:"10px", marginLeft: "20px"}} >{msg.message}</Typography> // Display each message
        ))}
        </StyledFlowBox>
      </Box>
      <TextField
        id="outlined-basic"
        label="NameOftheChat"
        variant="outlined"
        value={currentMessage.message}
        onChange={handleInputChange}
        style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleSendMessage}
                variant="contained" // Can be 'contained', 'outlined', etc.
                size="small" // Smaller button to fit within the text field
              >
                Send
              </Button>
            </InputAdornment>
          ),
        }}
      />
    {/*   <Button
        onClick={handleSendMessage}
        variant="contained" // Can be 'contained', 'outlined', etc.
        size="small" // Smaller button to fit within the text field
      >
        Send
      </Button> */}
    </>
  );
};

export default Flow;
