const initState = {
  name:"name",
  email: "email",
  friends: [],
  friendsChatS: [],
  friendChat:{
    isActive: true,
    chatData: {},
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
          chatData: Object.keys(action.data).length === 0 ? state.friendChat.chatData : action.data
        }
      };
    }
    default: {
      return state;
    }
  }
};
