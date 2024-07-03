export const setServers = col => {
  return {
    type: "SET_SERVERS",
    servers: col
  };
};

export const clearFilter = () => {
  return {
    type: "CLEAR_FILTER"
  };
};
