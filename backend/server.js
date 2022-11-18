import express from "express";
import { createConection } from "./config/db.js";
import users from "./api/users.js";
import auth from "./api/auth.js";
import cors from "cors";

// connection to lowdb
createConection();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`⚡[Server running on port: ${PORT}]`));
