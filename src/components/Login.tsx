import React, { useEffect } from "react";
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
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserData,
    setAlertMessage,
    alertMessage,
    isAlertSuccessType,
    setIsAlertSuccessType,
  } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setPassword(value);
  };

  const handleLogin = async () => {
    try {
      const formattedEmail = email.toLowerCase().trim();
      const emailValidator = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;

      if (!emailValidator.test(formattedEmail)) {
        setAlertMessage("Please enter a valid email.");
        setIsAlertSuccessType(false);
        return;
      }

      if (password.length < 8) {
        setAlertMessage("Password must be at least 8 characters long.");
        setIsAlertSuccessType(false);
        return;
      }

      login({ email, password: password, setIsAuthenticated, setUserData, setAlertMessage });
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
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                      label="Password"
                      value={password}
                      onChange={(e) => handlePassword(e.target.value)}
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
