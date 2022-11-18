import { createContext } from "react";

interface UserContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  setUserData: React.Dispatch<any>;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface AlertContextProps {
  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  isAlertSuccessType: boolean;
  setIsAlertSuccessType: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);
