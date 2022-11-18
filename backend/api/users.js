import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection } from "../config/db.js";
import { check, validationResult } from "express-validator";

/**
 * User Endpoints
 *
 * Register User
 * - POST api/user
 *
 * Update User
 * - POST api/users/update
 */

const router = express.Router();

// POST method
// Register Route: api/users
router.post(
  "/",
  [
    check("firstName", "Firstname is required").not().isEmpty(),
    check("lastName", "Lastname is required").not().isEmpty(),
    check("email", "Email is not in correct format").isEmail(),
    check("password", "Password must contain at least 8 characters").isLength({
      min: 8,
    }),
    check("phone", "Phone Number is not in correct format")
      .isMobilePhone()
      .optional({ checkFalsy: true }),
  ],
  async (req, res) => {
    try {
      const db = getConnection();
      const { users } = db.data;
      const { firstName, lastName, email, password, phone, address, age, eyeColor, company } =
        req.body;

      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = users.find((u) => u.email == email);
      if (user) {
        return res.status(400).json({ message: "User Aleready Exists" });
      }

      const id = uuidv4();
      const guid = uuidv4();
      const salt = await bcrypt.genSalt(5);
      const pwHash = await bcrypt.hash(password, salt);

      const dollars = Math.floor(Math.random() * 10000000) + 1;
      const cents = Math.floor(Math.random() * 99) + 1;
      const balance = `$${dollars.toLocaleString()}.${cents}`;

      const _ = users.push({
        _id: id,
        guid: guid,
        isActive: true,
        balance: balance,
        picture: `https://robohash.org/${pwHash}.png`,
        age: age,
        eyecolor: eyeColor,
        name: {
          first: firstName,
          last: lastName,
        },
        company: company,
        email: email,
        salt: salt,
        password: pwHash,
        phone: phone,
        address: address,
      });

      await db.write();

      // const payload = {
      //   user: {
      //     id: id,
      //   },
      // };

      // jwt.sign(payload, "thisIsSecret", { expiresIn: "30m" }, (err, token) => {
      //   if (err) throw err;
      //   res.json({ token });
      // });
    } catch (err) {
      res.status(500).send(`[Server Error]`, err);
    }
  }
);

// POST Method
// Update User Route: api/users/update
router.post(
  "/update",
  [
    check("firstName", "Firstname is required").not().isEmpty(),
    check("lastName", "Lastname is required").not().isEmpty(),
    check("email", "Email is not in correct format").isEmail(),
    check("phone", "Phone Number is not in correct format")
      .isMobilePhone()
      .optional({ checkFalsy: true }),
  ],
  async (req, res) => {
    try {
      const db = getConnection();

      const { users } = db.data;
      const { id, firstName, lastName, email, phone, company, address, age, eyeColor } = req.body;

      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userFound = users.find((u) => u.email == req.body.email);
      if (userFound && req.body.id !== userFound._id) {
        return res.status(400).json({ message: "User Aleready Exists" });
      }

      let user = db.data.users.find((u) => u._id === id);
      user.age = age;
      user.eyeColor = eyeColor;
      user.name.first = firstName;
      user.name.last = lastName;
      user.company = company;
      user.email = email;
      user.phone = phone;
      user.address = address;

      db.data.users.map((u) => (u._id === id ? user : u));
      await db.write();
      const payload = {
        user: {
          id: id,
        },
      };

      jwt.sign(payload, "thisIsSecret", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send(`[Server Error]`, err);
    }
  }
);

export default router;
