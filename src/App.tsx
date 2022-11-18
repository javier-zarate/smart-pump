import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { Account, EditProfile, Login, NavBar, Register } from "components";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  setUserData: React.Dispatch<any>;
  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}
export const UserContext = createContext<UserContextProps>(null);

export const App = () => {
  // const { css } = useClasses(null);

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.token);
  const [userData, setUserData] = useState(
    !!localStorage.userData ? JSON.parse(localStorage.getItem("userData")) : null
  );
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <UserContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          userData,
          setUserData,
          alertMessage,
          setAlertMessage,
        }}
      >
        <BrowserRouter>
          <Grid item xs>
            {!!alertMessage && <Alert severity="error">{alertMessage}</Alert>}
            <Grid container alignContent="center" justifyContent="center" alignItems="center">
              <NavBar />

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Routes>
            </Grid>
          </Grid>
        </BrowserRouter>
      </UserContext.Provider>
    </Grid>
  );
};

// const styles = {
//   body: {
//     alignItems: "center",
//     padding: "1rem",
//     overflow: "auto",
//   },
//   root: {
//     display: "flex",
//     flexFlow: "column",
//     // width: "inherit",
//     // height: "inherit",
//     // backgroundAttachment: "fixed",
//     // backgroundRepeat: "no-repeat",
//     // backgroundSize: "cover",
//     // background: "linear-gradient(to top left, #1b76bc, #fff)",
//     // transition: "all 225ms ease-in-out",
//   },
// };

// const useClasses = makeClasses({
//   body: {
//     alignItems: "center",
//     padding: "1rem",
//     overflow: "auto",
//   },
// });
