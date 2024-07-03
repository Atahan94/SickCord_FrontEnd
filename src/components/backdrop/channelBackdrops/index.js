import React from "react";
import { useSelector} from "react-redux";
import InvitePeople from "./İnvitePeople";
import CreateChannel from "./createChannel";
import CreateGroup from "./createGroup";

const ChannelBackDrops = () => {
  const { subType } = useSelector((state) => state.backDrop);
  return (
    <>
          {(() => {
            console.log("TypeBack:", subType)
            switch (subType) {
              case "Invite":
                return (<InvitePeople/>)
              case "Group":
                return (<CreateGroup/>)
              case "Channel":
                return (<CreateChannel/>)

              default:
                break;
            }
          })()}
    </>
  );
};

export default ChannelBackDrops;
