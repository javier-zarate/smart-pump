import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  colors,
  Container,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutUser } from "../../utils";
import { AlertContext, UserContext } from "contexts/contexts";
import { Icon, styles } from "styles";
import { DrawerOptions } from "./DrawerOptions";

export const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useContext(UserContext);
  const { setAlertMessage, setIsAlertSuccessType } = useContext(AlertContext);

  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogin = () => {
    navigate("/login");
    setIsDrawerOpen(false);
  };

  const handleHomeClick = () => {
    if (isAuthenticated) navigate("/account");
    else navigate("/login");

    setIsDrawerOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    logoutUser({ setIsAuthenticated, setUserData });
    setAlertMessage("You have been successfully logged out.");
    setIsAlertSuccessType(true);
    navigate("/login");
    setIsDrawerOpen(false);
  };

  const drawerOptionsProps = {
    toggleDrawer,
    handleHomeClick,
    handleLogout,
    handleLogin,
    handleRegister,
    isAuthenticated,
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: colors.blueGrey["900"], marginBottom: "2em" }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Toolbar>
            <IconButton name="Home" onClick={handleHomeClick} style={{ color: colors.grey["200"] }}>
              <Icon.InvertColorsTwoToneIcon />
              <Typography> Smart Pump</Typography>
            </IconButton>
          </Toolbar>
        </Grid>
        <Grid item>
          <Container>
            <IconButton name="Menu" onClick={toggleDrawer}>
              <MenuIcon style={{ color: colors.grey["200"] }} />
            </IconButton>
            <Drawer
              open={isDrawerOpen}
              anchor="top"
              hideBackdrop
              PaperProps={{ sx: { ...styles.drawer } }}
              elevation={0}
              variant="persistent"
            >
              <DrawerOptions {...drawerOptionsProps} />
            </Drawer>
          </Container>
        </Grid>
      </Grid>
    </AppBar>
  );
};
