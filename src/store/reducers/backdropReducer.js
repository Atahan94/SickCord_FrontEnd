
const initState = {
  toggle: false,
  type: "",
  subType:"",
};

export default (state = initState, action) => {
  switch (action.type) {
    case "TOGGLE": {
      return {
        ...state,
        toggle: !(state.toggle),
        type: action.backDropType,
        subType: action.backDropSubType
      };
    }
    default: {
      return state;
    }
  }
};
