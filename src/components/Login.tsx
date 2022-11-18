import {
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
import { UserContext } from "App";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUserData, setAlertMessage, alertMessage } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setEmailValue(value);
  };

  const handlePassword = (value: string) => {
    if (!!alertMessage) setAlertMessage("");
    setPasswordValue(value);
  };

  const handleLogin = async () => {
    try {
      const email = emailValue.toLowerCase().trim();
      const emailValidator = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;

      if (!emailValidator.test(email)) {
        setAlertMessage("Please enter a valid email.");
        return;
      }

      if (passwordValue.length < 8) {
        setAlertMessage("Password must be at least 8 characters long.");
        return;
      }

      login({ email, password: passwordValue, setIsAuthenticated, setUserData });
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
                  height="200"
                  width="200"
                  image={"/assets/logo.png"}
                  sx={{ objectFit: "contain", marginBottom: "2em" }}
                />
                <Box
                  component="form"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ "& .MuiTextField-root": { width: "30ch" } }}
                >
                  <div style={{ width: "15rem" }}>
                    <InputLabel>Email</InputLabel>
                    <TextField
                      label="Email"
                      value={emailValue}
                      onChange={(e) => handleEmail(e.target.value)}
                      size="small"
                      sx={{ ...styles.inputFields }}
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                      label="Password"
                      value={passwordValue}
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
