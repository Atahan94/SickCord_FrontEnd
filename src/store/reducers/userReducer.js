const initState = {
  name:"name",
  email: "email",
  friends: ["friends"]
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
