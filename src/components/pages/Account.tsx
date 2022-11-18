import React from "react";
import {
  colors,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UserContext } from "contexts/contexts";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from "styles";
import { CardStack } from "components";

export const Account = () => {
  const navigate = useNavigate();

  const { isAuthenticated, userData } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <CardStack title={"Account"}>
          <CardMedia
            component="img"
            height="150"
            width="150"
            image={`${userData?.picture}`}
            sx={{ objectFit: "contain" }}
          />
          <List sx={{ width: "100%", maxWidth: 800, bgcolor: colors.grey["100"] }} component="nav">
            <ListItemButton>
              <ListItemIcon>
                <Icon.PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Name" />
              <Typography
                style={{ textTransform: "capitalize" }}
              >{`${userData?.name?.first} ${userData?.name?.last}`}</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Icon.EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" />
              <Typography>{userData?.email}</Typography>
            </ListItemButton>
            {!!userData?.phone && (
              <ListItemButton>
                <ListItemIcon>
                  <Icon.LocalPhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Phone Number" />
                <Typography>{userData?.phone}</Typography>
              </ListItemButton>
            )}
            {!!userData?.address && (
              <ListItemButton>
                <ListItemIcon>
                  <Icon.HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Address" />
                <Typography display="block">{userData?.address}</Typography>
              </ListItemButton>
            )}
            {!!userData?.company && (
              <ListItemButton>
                <ListItemIcon>
                  <Icon.BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Company" />
                <Typography>{userData?.company}</Typography>
              </ListItemButton>
            )}
            {!!userData?.age && (
              <ListItemButton>
                <ListItemIcon>
                  <Icon.CakeIcon />
                </ListItemIcon>
                <ListItemText primary="Age" />
                <Typography>{userData?.age}</Typography>
              </ListItemButton>
            )}
            {!!userData?.eyecolor && (
              <ListItemButton>
                <ListItemIcon>
                  <Icon.VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Eye Color" />
                <Typography>{userData?.eyecolor}</Typography>
              </ListItemButton>
            )}
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <Icon.AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Balance" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Icon.AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Balance" />
                  <Typography>{userData?.balance}</Typography>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <Box textAlign="center" sx={{ marginY: "1em" }}>
            <Button variant="contained" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </Box>
        </CardStack>
      )}
    </>
  );
};
