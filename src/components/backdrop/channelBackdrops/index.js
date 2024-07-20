import React from "react";
import { useSelector} from "react-redux";
import InvitePeople from "./İnvitePeople";
import CreateChannel from "./createChannel";
import CreateGroup from "./createGroup";
import EditChannel from "./editChannel";

const ChannelBackDrops = () => {
  const { subType, id, channelid, groupID } = useSelector((state) => state.backDrop);
  return (
    <>
          {(() => {
            switch (subType) {
              case "Invite":
                return (<InvitePeople id={id}/>)
              case "Group":
                return (<CreateGroup id={id}/>)
              case "Channel":
                return (<CreateChannel id={id} groupID = {groupID}/>)
              case "Edit":
                return (<EditChannel id={id} channelID ={channelid} groupID={groupID}/>)
              default:
                break;
            }
          })()}
    </>
  );
};

export default ChannelBackDrops;
