export const setToggle = (type, subType = "", id = "", channelId = "", groupID = "") => {
  return {
    type: "TOGGLE",
    backDropType: type,
    backDropSubType: subType,
    serverID: id,
    channelId: channelId,
    groupID: groupID
  };
};

export const clearFilter = () => {
  return {
    type: "CLEAR_FILTER"
  };
};
