import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "[AUTHORIZATION DENIED]: No token found. " });
    }

    const decoded = jwt.verify(token, "thisIsSecret");
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "[AUTHORIZATION DENIED]: Invalid token." });
  }
};

export default auth;
