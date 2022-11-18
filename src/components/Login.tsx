import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  colors,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AlertContext, UserContext } from "contexts/contexts";
import { isEmailValid, login } from "../utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styles } from "styles/styles";

export const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData } = useContext(UserContext);
  const { alertMessage, setAlertMessage, isAlertSuccessType, setIsAlertSuccessType } =
    useContext(AlertContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    try {
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

      const formattedEmail = email.toLowerCase().trim();

      login({
        email: formattedEmail,
        password,
        setIsAuthenticated,
        setUserData,
        setAlertMessage,
      });
    } catch (err) {
      console.error("[Error login in]:", err);
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
              Login
            </Typography>
            <Card variant="outlined" sx={{ ...styles.innerCard }}>
              <CardContent>
                <CardMedia
                  component="img"
                  image={"/src/assets/logo.png"}
                  height="200"
                  sx={{
                    objectFit: "contain",
                    marginBottom: "2em",
                    color: colors.grey["200"],
                  }}
                />
                <Box
                  component="form"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ "& .MuiTextField-root": { width: "30ch" } }}
                >
                  <div style={{ width: "15rem" }}>
                    {!!alertMessage && (
                      <Alert
                        severity={isAlertSuccessType ? "success" : "error"}
                        onClose={() => setAlertMessage("")}
                      >
                        {alertMessage}
                      </Alert>
                    )}
                    <InputLabel>Email</InputLabel>
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => handleEmail(e.target.value)}
                      error={!!emailErrorText}
                      helperText={emailErrorText}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                      label="Password"
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
                              {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box textAlign="center">
                      <Button variant="contained" onClick={handleLogin} fullWidth>
                        Login
                      </Button>
                      <Typography>Don't have an account?</Typography>
                      <Link href="/register" rel="noopener">
                        <Typography>Sign up now</Typography>
                      </Link>
                    </Box>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </>
  );
};
