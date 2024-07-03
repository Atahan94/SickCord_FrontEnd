import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToggle } from "../../store/actions/backdropActions";
import { createTheme, ThemeProvider, Backdrop } from "@mui/material";
import CreateOrJoinServer from "./serverBackdrops";
import ChannelBackDrops from "./channelBackdrops";

const MaiBackdrop = () => {
  const { toggle, type } = useSelector((state) => state.backDrop);
  const dispatch = useDispatch();

  const darkTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={toggle}
        onClick={(e) => {
          // Check if the clicked element is the backdrop itself
          if (e.target === e.currentTarget) {
            // If it is, then trigger your dispatch action
            dispatch(setToggle(""));
          }
        }}
      >
        <ThemeProvider theme={darkTheme}>
          {(() => {
            console.log("TypeBack:", type)
            switch (type) {
              case "Server":
                return (<CreateOrJoinServer/>)
              case "Channel":
                return (<ChannelBackDrops/>)

              default:
                break;
            }
          })()}
        </ThemeProvider>
      </Backdrop>
    </>
  );
};

export default MaiBackdrop;
