import { Box, styled, Container } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Header, Sidebar } from "../component";
import { drawerWidth } from "../config/constants.config";
import { useAuth } from "../hooks/useAuth";

interface IMainContainerProps {
  open: boolean;
}

//This component represents the layout of the admin panel. It imports several components from the Material UI library, such as Box, styled, and Container. It also imports the React module, Navigate, Outlet, and useNavigate from react-router-dom, and the useAuth hook from the application's hooks directory.
const MainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<IMainContainerProps>(({ theme, open }) => ({
  id:"formError",
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

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [drawerState, setDrawerState] = React.useState(true);

  const handleDrawerState = () => {
    setDrawerState((prev) => !prev);
  };

  if (!user) {
    
    return <Navigate to="/login" />;
  }

  const onLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: "flex" }} id="sidebar-menu-icon">
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

export default AdminLayout;
