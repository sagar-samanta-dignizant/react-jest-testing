import { Box, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../component";
import { drawerWidth } from "../config/constants.config";
import { useAuth } from "../hooks/useAuth";

interface IMainContainerProps {
  open: boolean;
}

//This code defines the UserLayout component, which is responsible for rendering the layout of the user section of the application. The layout consists of a header, a sidebar, and a main content area that displays the content of the current page using the Outlet component from react-router-dom.
const MainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<IMainContainerProps>(({ theme, open }) => ({
  id: "formError",
  minHeight: `calc(100vh - 90px)`,
  marginLeft: "10px",
  marginTop: theme.spacing(10),
  padding: theme.spacing(4),
  borderRadius: "10px",
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minWidth: `calc(100vw - 100px)`,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    minWidth: `calc(100vw - ${drawerWidth}px - 20px)`,
  }),
}));

export const UserLayout = () => {
  const { logout } = useAuth();
  const [drawerState, setDrawerState] = React.useState(true);

  const handleDrawerState = () => {
    setDrawerState((prev) => !prev);
  };

  const onLogout = () => {
    logout();
  };

  const user = { role: "user" };

  return (
    <Box sx={{ display: "flex" }}>
      
      <Header
        drawerState={drawerState}
        onLogout={onLogout}
        handleDrawerState={handleDrawerState}
      />
      <Sidebar open={drawerState} onStateChange={handleDrawerState} />
      <MainContainer open={drawerState}>
        <Outlet />
      </MainContainer>
    </Box>
  );
};

export default UserLayout;
