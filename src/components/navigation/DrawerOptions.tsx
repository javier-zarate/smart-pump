import {
  Box,
  colors,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "styles";

interface DrawerOptionsProps {
  toggleDrawer: () => void;
  handleHomeClick: () => void;
  handleLogout: () => void;
  handleLogin: () => void;
  handleRegister: () => void;
  isAuthenticated: boolean;
}

export const DrawerOptions = ({
  toggleDrawer,
  handleHomeClick,
  handleLogout,
  handleLogin,
  handleRegister,
  isAuthenticated,
}: DrawerOptionsProps) => {
  return (
    <Box
      sx={{ width: "auto", color: colors.grey["200"] }}
      role="presentation"
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        <ListItem disablePadding onClick={handleHomeClick}>
          <ListItemButton>
            <ListItemIcon>
              <Icon.HomeIcon style={{ color: colors.grey["200"] }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated ? (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <Icon.LogoutIcon style={{ color: colors.grey["200"] }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding onClick={handleLogin}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon.LoginIcon style={{ color: colors.grey["200"] }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleRegister}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon.PersonAddIcon style={{ color: colors.grey["200"] }} />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};
