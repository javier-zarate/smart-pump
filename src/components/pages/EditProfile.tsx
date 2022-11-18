import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AlertContext, UserContext } from "contexts/contexts";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../utils";
import { styles } from "styles";

export const EditProfile = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(UserContext);
  const { alertMessage, setAlertMessage, setIsAlertSuccessType } = useContext(AlertContext);

  const [firstName, setFirstName] = useState(userData?.name?.first);
  const [lastName, setLastName] = useState(userData?.name?.last);
  const [emailValue, setEmailValue] = useState(userData?.email);
  const [age, setAge] = useState(userData?.age);
  const [eyeColor, setEyeColor] = useState(userData?.eyecolor);
  const [company, setCompany] = useState(userData?.company);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone);
  const [address, setAddress] = useState(userData?.address);

  const handleEmail = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setEmailValue(value);
  };

  const handleCancel = () => {
    setAlertMessage("");
    navigate("/account");
  };

  const handleUpdate = async () => {
    try {
      const email = emailValue.toLowerCase().trim();
      const emailValidator = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;

      if (!emailValidator.test(email)) {
        setAlertMessage("Please enter a valid email.");
        setIsAlertSuccessType(false);

        return;
      }

      updateUserProfile({
        id: userData?._id,
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        company,
        age,
        eyeColor,
        address,
        setIsAuthenticated,
        setUserData,
        setAlertMessage,
      });

      navigate("/account");
    } catch (err) {
      console.error("[Error updating user]", err);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <Card sx={{ ...styles.mainCard }} variant="outlined">
          <CardContent>
            <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
              Edit Profile
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
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{ "& .MuiTextField-root": { width: "30ch" } }}
                >
                  <Grid item>
                    <InputLabel>First name</InputLabel>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Last Name</InputLabel>

                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Email</InputLabel>
                    <TextField
                      label="email"
                      value={emailValue}
                      onChange={(e) => handleEmail(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Address</InputLabel>
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel>Age</InputLabel>
                    <TextField
                      label="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Eye Color</InputLabel>
                    <TextField
                      label="Eye Color"
                      value={eyeColor}
                      onChange={(e) => setEyeColor(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Company</InputLabel>
                    <TextField
                      label="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Phone Number</InputLabel>
                    <TextField
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                >
                  <Grid item>
                    <Button onClick={handleCancel} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleUpdate} variant="contained">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </>
  );
};
