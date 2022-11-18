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
}

export const login = async ({ email, password, setIsAuthenticated, setUserData }: LoginProps) => {
  try {
    const data = JSON.stringify({ email, password });
    const config = { headers: { "Content-Type": "Application/json" } };

    const res = await axios.post("/api/auth", data, config);

    updateSession({ isSession: true, setIsAuthenticated, token: res?.data?.token });

    console.log("User logged in...");

    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData });
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated });
    handleError("[Error during login]:", err);
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

    console.log("register", { res });

    updateSession({
      isSession: true,
      setIsAuthenticated,
      setUserData,
      data: res?.data,
      token: res?.data?.token,
    });

    console.log("New user registered...");

    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData });
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated, setUserData });
    handleError("[Error during registration]:", err);
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
}

export const loadUserProfile = async ({
  token,
  setIsAuthenticated,
  setUserData,
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
    handleError("[Error loading profile]:", err);
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

    loadUserProfile({ token: res?.data?.token, setIsAuthenticated, setUserData });

    console.log("User profile updated...");
  } catch (err) {
    updateSession({ isSession: false, setIsAuthenticated, setUserData });
    handleError("[Error loading profile]:", err);
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

const handleError = (message: string, err: any) => {
  if (err.response) {
    console.log(message, "status code", err.response.status);
    console.log(message, "data", err.response.data);
    console.log(message, "headers", err.response.headers);
  } else if (err.request) {
    console.log(message, "No response", err.request);
  } else {
    // Something happened in setting up the request that triggered an err
    console.log(message, "Error in request setup", err.message);
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
