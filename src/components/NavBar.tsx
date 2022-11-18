import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  colors,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutUser } from "utils";
import { UserContext } from "App";
import InvertColorsTwoToneIcon from "@mui/icons-material/InvertColorsTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useContext(UserContext);

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
    navigate("/login");
  };

  const drawerOptions = (
    <Box
      sx={{ width: "auto", color: colors.grey["200"] }}
      role="presentation"
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        <ListItem disablePadding onClick={handleHomeClick}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon style={{ color: colors.grey["200"] }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated ? (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon style={{ color: colors.grey["200"] }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding onClick={handleLogin}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon style={{ color: colors.grey["200"] }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleRegister}>
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddIcon style={{ color: colors.grey["200"] }} />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: colors.blueGrey["900"], marginBottom: "2em" }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Toolbar>
            <IconButton name="Home" onClick={handleHomeClick} style={{ color: colors.grey["200"] }}>
              <InvertColorsTwoToneIcon />
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
              {drawerOptions}
            </Drawer>
          </Container>
        </Grid>
      </Grid>
    </AppBar>
  );
};

const styles = {
  drawer: {
    marginTop: "3.3rem",
    backgroundColor: colors.blueGrey["900"],
  },
};
