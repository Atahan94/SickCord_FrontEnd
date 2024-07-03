import { useState } from "react";
import React from "react";
import {
  StyledSectionContainer,
  Section1,
  Section2,
  Section4
} from "../../../materialUİElements/sectionsMUİ";
import ChatsSection from "./chat/chats-section";
import Flow from "../Uİ-utility/flow";
import UserProfile from "./chat/userProfile";
import UserFriends from "./userFriends";


const UserChats = () => {
  const [sectionToggle, setSectionToggle] = useState(true);
  const [isFriendsSection, setIsFriendsSection] = useState(true);
  return (
    <StyledSectionContainer>
      <Section1>
        <ChatsSection toggle={(e) => setIsFriendsSection(e)} />
      </Section1>
      {isFriendsSection === true ? (
        <Section2
        >
          <UserFriends />
        </Section2>
      ) : (
        <>
          <Section2
          >
            <Flow toggle={() => {setSectionToggle(!sectionToggle)}} isServer={false}/>
          </Section2>
          <Section4
            style={{
              display: sectionToggle ? "flex" : "none",
            }}
          >
            <UserProfile />
          </Section4>
        </>
      )}
    </StyledSectionContainer>
  );
};

export default UserChats;
