

const initState = {
    token: null,
  };
  
  export default (state = initState, action) => {
    switch (action.type) {
      case "SET_TOKEN": {
        return {
          ...state,
          token: action.token,
        };
      }
      case "CLEAR_TOKEN": {
        return {
          ...state,
          token: null,
        };
      }
      default: {
        return state;
      }
      
    }
  };
  