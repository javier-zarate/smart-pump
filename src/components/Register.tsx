import {
  Grid,
  Card,
  CardContent,
  colors,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { UserContext } from "App";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { register } from "utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData, alertMessage, setAlertMessage } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [age, setAge] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setEmailValue(value);
  };

  const handleRegister = async () => {
    try {
      const email = emailValue.toLowerCase().trim();
      const emailValidator = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;

      if (!emailValidator.test(email)) {
        setAlertMessage("Please enter a valid email.");
        return;
      }

      register({
        firstName,
        lastName,
        email,
        password: passwordValue,
        phone: phoneNumber,
        company,
        age,
        eyeColor,
        address,
        setIsAuthenticated,
        setUserData,
      });
    } catch (err) {
      console.error("[Error registering user]", err);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/account" />
      ) : (
        <Card sx={{ ...styles.mainCard }} variant="outlined">
          <CardContent>
            <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
              Register
            </Typography>
            <Card variant="outlined" sx={{ ...styles.innerCard }}>
              <CardContent>
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
                    <InputLabel>Password</InputLabel>
                    <TextField
                      label="Password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel>Address</InputLabel>
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <Box textAlign="center">
                      <Button variant="contained" onClick={handleRegister} fullWidth>
                        Register
                      </Button>
                      <Typography> Already have an account?</Typography>
                      <Link href="/login" rel="noopener">
                        <Typography>Login here</Typography>
                      </Link>
                    </Box>
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

const styles = {
  inputFields: {
    marginY: "1em",
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
