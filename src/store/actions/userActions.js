export const setUser = user => {
  return {
    type: "SET_USER",
    user
  };
};
export const setFriends = friends => {
  return {
    type: "SET_FRİENDS",
    friends
  };
};
export const setChats = chats => {
  return {
    type: "SET_CHATS",
    chats
  };
};
export const setActiveChat = (active, data = {}) => {
  return {
    type: "SET_ACTİVE_CHAT",
    active,
    data: data
  };
};
export const setVoiceChat = (active, data) => {
  return {
    type: "SET_VOİCECHAT",
    active,
    id:data.id,
    name: data.name 
  };
};


