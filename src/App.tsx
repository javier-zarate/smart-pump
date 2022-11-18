import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import { Account, EditProfile, Login, NavBar, NotFound, Register } from "./components";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  setUserData: React.Dispatch<any>;
  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  isAlertSuccessType: boolean;
  setIsAlertSuccessType: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.token);
  const [userData, setUserData] = useState(
    !!localStorage.userData ? JSON.parse(localStorage.getItem("userData")!) : null
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertSuccessType, setIsAlertSuccessType] = useState(false);

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
          isAlertSuccessType,
          setIsAlertSuccessType,
        }}
      >
        <BrowserRouter>
          <Grid item xs>
            <Grid container alignContent="center" justifyContent="center" alignItems="center">
              <NavBar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Grid>
          </Grid>
        </BrowserRouter>
      </UserContext.Provider>
    </Grid>
  );
};
