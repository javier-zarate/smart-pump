import React from "react";
import {
  colors,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import CakeIcon from "@mui/icons-material/Cake";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Navigate, useNavigate } from "react-router-dom";

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
        <Card sx={{ ...styles.mainCard }} variant="outlined">
          <CardContent>
            <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
              Login
            </Typography>
            <Card variant="outlined" sx={{ ...styles.innerCard }}>
              <CardContent>
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  image={`${userData?.picture}`}
                  sx={{ objectFit: "contain" }}
                />
                <List
                  sx={{ width: "100%", maxWidth: 800, bgcolor: colors.grey["100"] }}
                  component="nav"
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Name" />
                    <Typography
                      style={{ textTransform: "capitalize" }}
                    >{`${userData?.name?.first} ${userData?.name?.last}`}</Typography>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email" />
                    <Typography>{userData?.email}</Typography>
                  </ListItemButton>
                  {!!userData?.phone && (
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalPhoneIcon />
                      </ListItemIcon>
                      <ListItemText primary="Phone Number" />
                      <Typography>{userData?.phone}</Typography>
                    </ListItemButton>
                  )}
                  {!!userData?.address && (
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Address" />
                      <Typography display="block">{userData?.address}</Typography>
                    </ListItemButton>
                  )}
                  {!!userData?.company && (
                    <ListItemButton>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary="Company" />
                      <Typography>{userData?.company}</Typography>
                    </ListItemButton>
                  )}
                  {!!userData?.age && (
                    <ListItemButton>
                      <ListItemIcon>
                        <CakeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Age" />
                      <Typography>{userData?.age}</Typography>
                    </ListItemButton>
                  )}
                  {!!userData?.eyecolor && (
                    <ListItemButton>
                      <ListItemIcon>
                        <VisibilityIcon />
                      </ListItemIcon>
                      <ListItemText primary="Eye Color" />
                      <Typography>{userData?.eyecolor}</Typography>
                    </ListItemButton>
                  )}
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Balance" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account Balance" />
                        <Typography>{userData?.balance}</Typography>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </CardContent>
            </Card>
            <Box textAlign="center" sx={{ marginTop: "1em" }}>
              <Button variant="contained" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const styles = {
  inputFields: {
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor: "white",
  },
  mainCard: {
    marginTop: "5em",
    maxWidth: 800,
    width: "100%",
  },
  innerCard: {
    border: `2px solid ${colors.grey["400"]}`,
    backgroundColor: colors.grey["100"],
  },
};
