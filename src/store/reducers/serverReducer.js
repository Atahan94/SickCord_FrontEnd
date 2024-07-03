
const initialState = {
 servers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVERS": {
      return {
        ...state,
        servers: action.servers
      };
    }
    default: {
      return state;
    }
  }
};
