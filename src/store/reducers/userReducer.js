const initState = {
  name:"name",
  email: "email",
  id: 0,
  friends: [],
  onlineFriends:[],
  friendsChatS: [],
  friendChat:{
    isActive: true,
    chatData: {},
  },
  voiceChat:{
    isConnected: false,
    channelID: 0,
    channelName: "",
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
       ...state,
       ...action.user
      };
    }
    case "SET_FRİENDS": {
      return {
        ...state,
       friends: [...action.friends]
      };
    }
    case "SET_ONLİNE_FRİENDS": {
      return {
        ...state,
        onlineFriends: [...action.friends]
      };
    }
    case "SET_CHATS": {
      return {
        ...state,
        friendsChatS: [...action.chats]
      };
    }
    case "SET_ACTİVE_CHAT": {
      return {
        ...state,
        friendChat: {
          isActive: action.active,
          chatData:{...action.data}
        }
      };
    }
    case "SET_VOİCECHAT": {
      return {
        ...state,
        voiceChat: {
          isConnected: action.active,
          channelID: action.id,
          channelName: action.name
        }
      };
    }
    default: {
      return state;
    }
  }
};
