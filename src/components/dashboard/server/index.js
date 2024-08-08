import { useEffect, useState } from "react";
import {
  StyledSectionContainer,
  Section1,
  Section2,
  Section3
} from "../../../materialUİElements/sectionsMUİ";
import ChannelSection from "./channel/channel-section";
import Flow from "../Uİ-utility/flow";
import VoiceChat from "../Uİ-utility/voiceChat"; 
import ServerMembers from "./serverMembers";
import NoChannel from "../Uİ-utility/noChannel";
import { useSelector } from "react-redux";

const Server = ({serverData}) => {
  const [sectionToggle, setSectionToggle] = useState(true);

  const {id} = useSelector((state) => state.user)

 
  console.log("SERVER DATA", serverData, "isowner", id === serverData.owner);

  useEffect(() =>{
    serverData.activeChat.type !== "text" && setSectionToggle(false)
  },[])
  return (
    <StyledSectionContainer>
      <Section1>
        <ChannelSection name={serverData.name} serverId={serverData._id} channels={serverData.channels} groups = {serverData.groups} owner={id === serverData.owner}  />
      </Section1>
      <Section2>
      { serverData.activeChat !== "no channel yet"? (serverData.activeChat.type === "text"? <Flow toggle={() => setSectionToggle(!sectionToggle)} isServer={true} serverId={serverData._id} data={serverData.activeChat}/> : <VoiceChat isServer={true}/>):  <NoChannel/>}
      </Section2>
      <Section3
        style={{display: sectionToggle ? "block" : "none"}}
      >
        <ServerMembers serverID={serverData._id} />
      </Section3>
    </StyledSectionContainer>
  );
};

export default Server;
