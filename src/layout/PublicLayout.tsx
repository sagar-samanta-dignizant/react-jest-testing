import { Card, CardContent, Grid, styled } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../component/Logo";
import { useAuth } from "../hooks/useAuth";

const RootStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(0, 0),
}));

//This code is defining PublicLayout. It imports several MUI components and the Navigate and Outlet components from react-router-dom, as well as the Logo component and the useAuth hook from local files.
export const PublicLayout = () => {
  const { user } = useAuth();

  if (user) {
    const userData: any = user;
    if (userData.role === "admin") {
      localStorage.clear();
      return <Navigate to="/admin" />;
    }
    if (userData.role === "user") {
      
      return <Navigate to="/user" />;
    }
  }

  return (
    <RootStyle>
      <Card>
        <CardContent>
          <Logo />
          <Outlet />
        </CardContent>
      </Card>
    </RootStyle>
  );
};

export default PublicLayout;
