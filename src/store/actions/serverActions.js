export const setServers = col => {
  const updatedCol = col.map(server => ({
    ...server,
    activeChat: server.channels[0] || "no channel yet" // or any default value you want for activeChat
  }));

  return {
    type: "SET_SERVERS",
    servers: updatedCol
  };
};
export const setActiveServerID = ID => {

  return {
    type: "SET_ACTİVE_SERVERID",
    ID
  };
};

export const setActiveChat = (serverID, chatID, groupID = "") => {
  return {
    type: "SET_ACTIVE_CHAT",
    serverID,
    chatID,
    groupID
  };
};

export const clearFilter = () => {
  return {
    type: "CLEAR_FILTER"
  };
};
