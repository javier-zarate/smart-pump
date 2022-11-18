import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

/**
 * API and Helper Functions
 *
 * API:
 * - login
 * - register
 * - loadUserProfile
 * - updateUserProfile
 * - logoutUser
 *
 * Helper Functions:
 * - handleError
 * - updateSession
 */

/**
 ************************** API Calls **************************
 */

/**
 * Login User
 */
interface LoginProps {
  email: string;
  password: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<any>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const login = async ({
  email,
  password,
  setIsAuthenticated,
  setUserData,
  setAlertMessage,
}: LoginProps) => {
  try {
    const data = JSON.stringify({ email, password });
    const config = { headers: { "Content-Type": "Application/json" } };

    const res = await axios.post("/api/auth", data, config);

    updateSession({ isSession: true, setIsAuthenticated, token: res?.data?.token });

    console.log("User logged in...");

    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData, setAlertMessage });
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated });
    handleError({ description: "[Error during login]:", err, setAlertMessage });
  }
};

/**
 * Register New User
 */

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  age?: string;
  eyeColor?: string;
  address?: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<any>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  company,
  age,
  eyeColor,
  address,
  setIsAuthenticated,
  setUserData,
  setAlertMessage,
}: RegisterProps) => {
  try {
    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      age,
      eyeColor,
      address,
    });

    const config = { headers: { "Content-Type": "Application/json" } };

    const res = await axios.post("/api/users", data, config);

    updateSession({
      isSession: true,
      setIsAuthenticated,
      setUserData,
      data: res?.data,
      token: res?.data?.token,
    });

    console.log("New user registered...");
    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData, setAlertMessage });
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated, setUserData });
    handleError({ description: "[Error during registration]:", err, setAlertMessage });
  }
};

/**
 *
 * Load User Profile
 */
interface LoadUserProfileProps {
  token: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<any>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const loadUserProfile = async ({
  token,
  setIsAuthenticated,
  setUserData,
  setAlertMessage,
}: LoadUserProfileProps) => {
  try {
    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }

    const res = await axios.get("/api/auth");

    setIsAuthenticated(true);
    setUserData(res.data);

    updateSession({
      isSession: true,
      setIsAuthenticated,
      setUserData,
      data: res?.data,
    });

    console.log("User profile loaded...");
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated, setUserData });
    handleError({ description: "[Error loading profile]:", err, setAlertMessage });
  }
};

/**
 *
 * Update User Profile
 */
interface UpdateUserProfileProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  eyeColor: string;
  company: string;
  address: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<any>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const updateUserProfile = async ({
  id,
  firstName,
  lastName,
  email,
  phone,
  age,
  eyeColor,
  company,
  address,
  setIsAuthenticated,
  setUserData,
  setAlertMessage,
}: UpdateUserProfileProps) => {
  try {
    const data = JSON.stringify({
      age,
      eyeColor,
      firstName,
      lastName,
      company,
      email,
      phone,
      address,
      id,
    });
    const config = { headers: { "Content-Type": "Application/json" } };

    const res = await axios.post("/api/users/update", data, config);

    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData, setAlertMessage });

    console.log("User profile updated...");
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated, setUserData });
    handleError({ description: "[Error loading profile]:", err, setAlertMessage });
  }
};

/**
 *
 * Logout User
 */
interface LogoutUserProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<any>;
}

export const logoutUser = ({ setIsAuthenticated, setUserData }: LogoutUserProps) => {
  updateSession({ isSession: false, setIsAuthenticated, setUserData });
  console.log("User has been logged out...");
};

/**
 ************************** Helper Functions **************************
 */

interface HandleErrorProps {
  description: string;
  err: any;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

const handleError = ({ description, err, setAlertMessage }: HandleErrorProps) => {
  if (err.response) {
    const { status, data, headers } = err.response;
    console.log(description, "status code", status);
    console.log(description, "data", data);
    console.log(description, "headers", headers);
    setAlertMessage(data.message);
  } else if (err.request) {
    console.log(description, "No response", err.request);
  } else {
    // Something happened in setting up the request that triggered an err
    console.log(description, "Error in request setup", err.message);
  }
};

interface UpdateSessionProps {
  isSession: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData?: React.Dispatch<any>;
  data?: any;
  token?: string;
}

const updateSession = ({
  isSession,
  setIsAuthenticated,
  setUserData,
  data,
  token,
}: UpdateSessionProps) => {
  if (isSession) {
    token && localStorage.setItem("token", token);
    data && localStorage.setItem("userData", JSON.stringify(data));
    setIsAuthenticated(true);
    setUserData && setUserData(data);
  } else {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserData && setUserData(null);
  }
};
