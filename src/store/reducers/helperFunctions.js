export const findServer = (servers, serverID) => {
    return servers.find(server => server._id === serverID);
  };
  
  export const findGroup = (groups, groupID) => {
    return groups.find(group => group._id === groupID);
  };
  
  export const findChannel = (channels, channelID) => {
    return channels.find(channel => channel._id === channelID);
  };