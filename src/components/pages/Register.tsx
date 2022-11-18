import React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import { AlertContext, UserContext } from "contexts/contexts";
import { useContext, useState } from "react";
import { AddressForm } from "./AddressForm";
import { Navigate, useNavigate } from "react-router-dom";
import { isEmailValid, register } from "../../utils";
import { Icon, styles } from "styles";
import { CardStack } from "components";

export const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useContext(UserContext);
  const { alertMessage, setAlertMessage, setIsAlertSuccessType } = useContext(AlertContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const handleEmail = (value: string) => {
    if (isEmailValid(email)) setEmailErrorText("Invalid Email Format");
    else setEmailErrorText("");

    if (!!alertMessage) setAlertMessage("");
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    // error message will clear after 8th key press
    if (password.length < 7) setPasswordErrorText("Password must be at least 8 characters long");
    else setPasswordErrorText("");

    if (!!alertMessage) setAlertMessage("");
    setPassword(value);
  };

  const handleRegister = async () => {
    try {
      const formattedEmail = email.toLowerCase().trim();

      if (!firstName || !lastName || !email || !password) {
        setAlertMessage("Must provide first name, last name, email, and password");
        setIsAlertSuccessType(false);
        return;
      }

      if (isEmailValid(email)) {
        setAlertMessage("Please enter a valid email.");
        setIsAlertSuccessType(false);
        return;
      }

      if (password.length < 8) {
        setAlertMessage("Password must be at least 8 characters long.");
        setIsAlertSuccessType(false);
        return;
      }

      let address = "";

      if (showAddressForm) {
        if (!street || !city || !state || !zipcode) {
          setAlertMessage("If adding address please fill out all inputs.");
          setIsAlertSuccessType(false);
          return;
        }
        address = `${street} ${city}, ${state} ${zipcode}`;
      }

      register({
        firstName,
        lastName,
        email: formattedEmail,
        password,
        phone,
        company,
        age,
        eyeColor,
        address,
        setIsAuthenticated,
        setUserData,
        setAlertMessage,
      });

      if (!alertMessage) {
        setAlertMessage("Successfully Created Account!");
        setIsAlertSuccessType(true);
        navigate("/login");
      }
    } catch (err) {
      console.error("[Error registering user]", err);
      console.log({ err });
    }
  };

  const AddressFormProps = {
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    zipcode,
    setZipcode,
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/account" />
      ) : (
        <CardStack title={"Register"}>
          {!!alertMessage && (
            <Alert severity="error" onClose={() => setAlertMessage("")}>
              {alertMessage}
            </Alert>
          )}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ "& .MuiTextField-root": { width: "30ch" } }}
          >
            <Grid item>
              <InputLabel>*First name</InputLabel>
              <TextField
                label="*First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                size="small"
                sx={{ ...styles.inputFields }}
              />
              <InputLabel>*Last Name</InputLabel>

              <TextField
                label="*Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                size="small"
                sx={{ ...styles.inputFields }}
              />
              <InputLabel>Email</InputLabel>
              <TextField
                label="*Email"
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
                error={!!emailErrorText}
                helperText={emailErrorText}
                size="small"
                sx={{ ...styles.inputFields }}
              />
              <InputLabel>*Password</InputLabel>
              <TextField
                label="*Password"
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
                error={!!passwordErrorText}
                helperText={passwordErrorText}
                size="small"
                sx={{ ...styles.inputFields }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <Icon.VisibilityIcon /> : <Icon.VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="small"
                sx={{ ...styles.inputFields }}
              />
            </Grid>
            {showAddressForm && <AddressForm {...AddressFormProps} />}
          </Grid>
          <Grid container direction="column" textAlign="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showAddressForm}
                    onChange={() => setShowAddressForm((prev) => !prev)}
                  />
                }
                label="Add Address"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleRegister}>
                Register
              </Button>
              <Typography> Already have an account?</Typography>
              <Link href="/login" rel="noopener">
                <Typography>Login here</Typography>
              </Link>
            </Grid>
          </Grid>
        </CardStack>
      )}
    </>
  );
};
