import { findServer, findGroup, findChannel } from "./helperFunctions";

const initialState = {
 servers: [],
 activeServer: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVERS": {
      return {
        ...state,
        servers: action.servers
      };
    }
    case "SET_ACTİVE_SERVERID": {
      return {
        ...state,
        activeServer: action.ID
      };
    }
    case "SET_ACTIVE_CHAT": {
      
      {
        const { serverID, chatID, groupID } = action;
        const server = findServer(state.servers, serverID);
  
        if (!server) return state;
  
        if (groupID) {
          const group = findGroup(server.groups, groupID);
          if (!group) return state;
  
          const channel = findChannel(group.channels, chatID);
          if (!channel) return state;
  
          server.activeChat = channel;
        } else {
          const channel = findChannel(server.channels, chatID);
          if (!channel) return state;
  
          server.activeChat = channel;
        }
  
        return {
          ...state,
          servers: state.servers.map(s => (s._id === serverID ? server : s))
        };
      }
    }
    default: {
      return state;
    }
  }
};
