import { useState, useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVoiceChat } from "../../../store/actions/userActions";
import SimplePeer from "simple-peer";
import {
  StyledBox3,
  StyledButtonBase,
} from "../../../materialUİElements/sectionsMUİ";
import {
  HeadsetOffOutlined as HeadsetOffOutlinedIcon,
  HeadphonesOutlined as HeadphonesOutlinedIcon,
  MicNoneOutlined as MicNoneOutlinedIcon,
  MicOffOutlined as MicOffOutlinedIcon,
} from "@mui/icons-material";
import PhoneDisabledSharpIcon from "@mui/icons-material/PhoneDisabledSharp";
import { Typography, Box } from "@mui/material";




const UserBar = () => {
  const [micToggle, setmicToggle] = useState(true);
  const [headPhoneToggle, setheadPhoneToggle] = useState(true);
  const [peers, setPeers] = useState([]);

  const { voiceChat } = useSelector((state) => state.user);
  const socket = useSelector(state => state.socket.socket);
  const dispatch = useDispatch();
  const userAudio = useRef();
  const peersRef = useRef([]);

  
  useEffect(() => {
    if (voiceChat.isConnected) {
      console.log("VoiceChat connected:", voiceChat.channelName);

      socket.emit('joinVoiceChannel', voiceChat.channelID);

      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        userAudio.current.srcObject = stream;
  
        socket.on('signal', signalData => {
          const item = peersRef.current.find(p => p.peerId === signalData.peerId);
          if (item) {
            item.peer.signal(signalData.signal);
          } else {
            const peer = createPeer(signalData.peerId, socket.id, stream);
            peer.signal(signalData.signal);
            peersRef.current.push({ peerId: signalData.peerId, peer });
            setPeers(users => [...users, peer]);
          }
        });
  
        socket.emit('signal', { peerId: socket.id, roomId: voiceChat.channelID });
      });
    } else {
      console.log("VoiceChat disconnected");
      socket.emit('disconnect voiceChannel');
    }

    return () => {
    socket.off('signal');
      
    };
  }, [voiceChat.isConnected,voiceChat.channelID]);

  function createPeer(peerId, initiatorId, stream) {
    const peer = new SimplePeer({
      initiator: initiatorId === socket.id,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('signal', { signal, peerId });
    });

    peer.on('stream', stream => {
      const audio = document.createElement('audio');
      audio.srcObject = stream;
      audio.play();
    });

    return peer;
  }
  

  const handleClick = (var1, var2, callback1, callback2, condition) => {
    let bool = !var1;
    callback1(bool);
    callback2(var2 === !condition && bool === condition ? condition : var2);
  };
  return (
    <Box>
      {voiceChat.isConnected && (
        <StyledBox3 sx={{ bottom: "7%", justifyContent: "space-around" }}>
          <>
        <audio ref={userAudio} autoPlay muted />
        {peers.map((peer, index) => (
          <audio key={index} autoPlay />
        ))}
        </>
          <Box style={{ display: "flex" }}>
            <Typography>{voiceChat.channelName}</Typography>
          </Box>
          <StyledButtonBase
            sx={{ marginLeft: "30%" }}
            onClick={() => {
              console.log("disconnected");
              dispatch(setVoiceChat(false, {id: 0 , name: ""}))
            }}
          >
            <PhoneDisabledSharpIcon />
          </StyledButtonBase>
        </StyledBox3>
      )}
      <StyledBox3>
        <Box style={{ display: "flex" }}>
          <img
            src="./images/8922789.png"
            alt="Image"
            className="channel-tab-user-image"
          />
          <Typography>User Name</Typography>
        </Box>
        <Box style={{ display: "flex", marginRight: "10px" }}>
          <StyledButtonBase
            onClick={() => {
              handleClick(
                micToggle,
                headPhoneToggle,
                setmicToggle,
                setheadPhoneToggle,
                true
              );
            }}
          >
            {micToggle === true ? (
              <MicNoneOutlinedIcon />
            ) : (
              <MicOffOutlinedIcon />
            )}
          </StyledButtonBase>
          <StyledButtonBase
            onClick={() => {
              handleClick(
                headPhoneToggle,
                micToggle,
                setheadPhoneToggle,
                setmicToggle,
                false
              );
            }}
          >
            {headPhoneToggle === true ? (
              <HeadphonesOutlinedIcon />
            ) : (
              <HeadsetOffOutlinedIcon />
            )}
          </StyledButtonBase>
        </Box>
      </StyledBox3>
    </Box>
  );
};

export default UserBar;
