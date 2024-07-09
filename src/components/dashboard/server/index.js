import { useState } from "react";
import {
  StyledSectionContainer,
  Section1,
  Section2,
  Section3
} from "../../../materialUİElements/sectionsMUİ";
import ChannelSection from "./channel/channel-section";
import Flow from "../Uİ-utility/flow";
import ServerMembers from "./serverMembers";

const Server = ({serverData}) => {
  const [sectionToggle, setSectionToggle] = useState(true);

  console.log("SERVER DATA",serverData);
  return (
    <StyledSectionContainer>
      <Section1>
        <ChannelSection name={serverData.name} serverId={serverData._id} channels={serverData.channels} groups = {serverData.groups} />
      </Section1>
      <Section2>
       <Flow toggle={() => setSectionToggle(!sectionToggle)} isServer={true}/>
      </Section2>
      <Section3
        style={{display: sectionToggle ? "block" : "none"}}
      >
        <ServerMembers />
      </Section3>
    </StyledSectionContainer>
  );
};

export default Server;
