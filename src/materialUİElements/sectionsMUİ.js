import { styled } from "@mui/system";
import { Box, ButtonBase, Tab } from "@mui/material";

//desired size 1436 X 566 

export const StyledBox = styled(Box)(({ hoverable }) => ({
  display: "flex",
  width: hoverable ? "235px" : "245px", // Adjust the width based on prop
  padding: "10px 0px 10px 0px",
  ...(hoverable && {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
      cursor: "pointer",
    },
  }),
}));

export const StyledBox1 = styled(Box)(() => ({
  cursor: "pointer", // Makes the text clickable
  color: "inherit", // Retains the same color as other text
  padding: "10px",
  // Optional padding for spacing
  width: "100%",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
  },
  display: "flex",
}));

export const StyledBox2 = styled(Box)(() => ({
  backgroundColor: "#2f2b2b",
  height: "85vh",
  overflowY: "auto", // Enable vertical scrolling
  // Custom scroll bar styles
  "&::-webkit-scrollbar": {
    width: "5px", // Scroll bar width
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // Scroll bar thumb color
    borderRadius: "4px", // Rounded corners for the thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555", // Darker color on hover
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#2f2b2b", // Scroll bar track color
  },
}));

export const StyledBox3 = styled(Box)(() => ({
  display: "flex",
  bottom: "0px",
  width: "246px",
  padding: "10px 0px 10px 0px",
  
  backgroundColor: "#222222",
}));

export const TabsStyledBox = styled(Box)(() => ({
  flexGrow: 1,
  bgcolor: `white`,
  display: "flex",
  height: "96vh",
  width: "100%",
}));

const getTabStyles = (isActive) => {
  if (isActive) {
    return {
      "& .server-tab-image": {
        width: "58px", // Default width
        height: "58px", // Default height
        borderRadius: "23%",
        transition: "all 0.3s ease", // Ensure transition is applied for all properties
      },
      "& .server-tab-line": {
        height: "35px", // Adjust this to control the length of the vertical line
        width: "4px", // This controls the thickness
        backgroundColor: "gray", // Adjust the color of the line
        borderRadius: 5,
        margin: "0px 5px 0px 0px",
        transition: "all 0.3s ease",
      },
    };
  } else {
    return {
      "&:hover .server-tab-image": {
        borderRadius: "23%",
        transition: "all 0.3s ease", // Ensure smooth hover transition
      },
      "& .server-tab-image": {
        width: "58px", // Default width
        height: "58px", // Default height
        borderRadius: "50%", // Default border-radius
        transition: "all 0.3s ease", // Apply transition to all changes
      },
      "&:hover .server-tab-line": {
        height: "26px", // Adjust this to control the length of the vertical line
        transition: "all 0.3s ease",
      },
      "& .server-tab-line": {
        height: "5px", // Adjust this to control the length of the vertical line
        width: "4px", // This controls the thickness
        backgroundColor: "gray", // Adjust the color of the line
        borderRadius: 5,
        margin: "0px 5px 0px 0px",
        transition: "all 0.3s ease",
      },
    };
  }
};

export const StyledTab = styled(Tab)(({ theme, isActive }) => ({
  ...getTabStyles(isActive),
}));




export const StyledFlowBox = styled(Box)(() => ({
  overflowY: "auto", // Enable vertical scrolling
  height: "calc(100% - 58px)",
  padding: "0px",
}));
export const StyledFlowBox1 = styled(Box)(() => ({
  position: "fixed",
  width: "80%",
  height: "6%",
  backgroundColor: "#4a4646",
  borderBottom: "1px solid #212121",
  display: "flex", // Use flex for alignment
  alignItems: "center", // Center text vertically
  justifyContent: "space-between",
}));

export const StyledButtonBase = styled(ButtonBase)(() => ({
  borderRadius: "7px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "lightgray",
  },
}));

export const Section1 = styled("div")({
  padding: "0",
  width: "246px",
  color: "white",
  backgroundColor: "#222222"
});
export const Section2 = styled("div")({
  padding: "0",
  flex: 1,
  backgroundColor: "#4a4646",
  position: "relative",
});
export const Section3 = styled("div")({
  padding: "0",
  width: "20%",
});
export const Section4 = styled("div")({
  padding: "0",
  width: "25%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "25px",
});

export const StyledSectionContainer = styled("div")(({ theme, isActive }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#2f2b2b", // Using camelCase for JavaScript object keys
  borderRadius: "10px 0 0 0",
  padding: "0px",
  display: "flex",
}));
