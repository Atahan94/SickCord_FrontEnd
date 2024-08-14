import { useState, useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVoiceChat } from "../../../store/actions/userActions";
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
  const audioContextRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);
  const scriptNodeRef = useRef(null);

  const { voiceChat, image, name } = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      if (headPhoneToggle) {
        {
          socket.on("audio1", (data) => {
            var audioContext1 = new (window.AudioContext ||
              window.webkitAudioContext)();

            const typedArray = new Float32Array(data);

            const audioBuffer = audioContext1.createBuffer(
              1,
              typedArray.length,
              audioContext1.sampleRate
            );

            const channelData = audioBuffer.getChannelData(0);

            channelData.set(typedArray);

            const audioBufferSource = audioContext1.createBufferSource();
            audioBufferSource.buffer = audioBuffer;
            audioBufferSource.connect(audioContext1.destination);

            audioBufferSource.start();
          });
        }
      } else {
        socket.off("audio1");
      }
      return () => {
        socket.off("audio1");
      };
    }
  }, [headPhoneToggle]);

  useEffect(() => {
    if (voiceChat.isConnected) {
      console.log("VoiceChat connected:", voiceChat.channelName);
      socket.emit("JoinVoiceChannel", { id: voiceChat.channelID });
      const setAndStart = async () => {
        await setupAudioStream();
        await startStreaming();
      };
      if (micToggle) {
        console.log("micON");
        setAndStart();
      } else {
        console.log("micOFF");
        stopStreaming();
      }
    } else {
      console.log("VoiceChat disconnected");
      stopStreaming();
    }

    return () => {};
  }, [voiceChat.isConnected, voiceChat.channelID, micToggle]);

  function stopStreaming() {
    // Disconnect the script node from the audio context

    if (scriptNodeRef.current) {
      socket.emit("disconnect Room");
      scriptNodeRef.current.disconnect();
      scriptNodeRef.current.onaudioprocess = null;
      scriptNodeRef.current = null;
    }

    if (mediaStreamSourceRef.current) {
      mediaStreamSourceRef.current.disconnect();
      mediaStreamSourceRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }

  async function startStreaming() {
    const bufferSize = 2048;
    scriptNodeRef.current = audioContextRef.current.createScriptProcessor(
      bufferSize,
      1,
      1
    );

    scriptNodeRef.current.onaudioprocess = function (audioProcessingEvent) {
      const inputBuffer = audioProcessingEvent.inputBuffer;
      const audioData = inputBuffer.getChannelData(0);

      // Send the audio data to the server

      /* socket.emit("audio", audioData); */
      console.log(audioData);
      socket.emit("audio", audioData);
    };

    mediaStreamSourceRef.current.connect(scriptNodeRef.current);
    scriptNodeRef.current.connect(audioContextRef.current.destination);
  }

  async function setupAudioStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current.latencyHint = "interactive"; // or 'playback'

      mediaStreamSourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
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
          <></>
          <Box style={{ display: "flex" }}>
            <Typography>{voiceChat.channelName}</Typography>
          </Box>
          <StyledButtonBase
            sx={{ marginLeft: "30%" }}
            onClick={() => {
              console.log("disconnected");
              dispatch(setVoiceChat(false, { id: 0, name: "" }));
            }}
          >
            <PhoneDisabledSharpIcon />
          </StyledButtonBase>
        </StyledBox3>
      )}
      <StyledBox3>
        <Box style={{ display: "flex"}}>
          <img
            src={image}
            alt="Image"
            className="channel-tab-user-image"
          />
          <Typography>{name}</Typography>
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
