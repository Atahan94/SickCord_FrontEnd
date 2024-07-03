const initState = {
  name:"name",
  email: "email",
  servers: ["servers"],
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
       ...action.user
      };
    }
    default: {
      return state;
    }
  }
};
