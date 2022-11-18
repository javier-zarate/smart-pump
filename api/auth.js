import express from "express";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getConnection } from "../config/db.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

// GET Method
// Users Route: api/users
router.get("/", auth, async (req, res) => {
  try {
    const db = getConnection();
    const { users } = db.data;

    const data = users.find((p) => p._id === req.user.id);
    const { password, ...user } = data;

    res.json(user);
  } catch (err) {
    res.status(500).send(`[Server Error]: ${err}`);
  }
});

// POST method
// Authentication Route: api/auth
router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const db = getConnection();

      const { users } = db.data;
      const { email, password } = req.body;

      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = users.find((u) => u.email == email);
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, "thisIsSecret", { expiresIn: "30m" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send(`[Server Error]: ${err}`);
    }
  }
);

export default router;
