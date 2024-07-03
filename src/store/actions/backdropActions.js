export const setToggle = (type, subType = "") => {
  return {
    type: "TOGGLE",
    backDropType: type,
    backDropSubType: subType,
  };
};

export const clearFilter = () => {
  return {
    type: "CLEAR_FILTER"
  };
};
