import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const {friendChat} = useSelector((state) => state.user)

  console.log("FRİENDS CHAT DATA", friendChat)


  return (
    <StyledSectionContainer>
      <Section1>
        <ChatsSection />
      </Section1>
      {friendChat.isActive === true ? (
        <Section2
        >
          <UserFriends />
        </Section2>
      ) : (
        <>
          <Section2
          >
           {friendChat.chatData && <Flow toggle={() => {setSectionToggle(!sectionToggle)}} isServer={false} data ={{ _id: friendChat.chatData.id , name: friendChat.chatData.with.name}}/>}
          </Section2>
          <Section4
            style={{
              display: sectionToggle ? "flex" : "none",
            }}
          >
            <UserProfile data={friendChat.chatData.with} />
          </Section4>
        </>
      )}
    </StyledSectionContainer>
  );
};

export default UserChats;
