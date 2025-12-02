import bcrypt from "bcrypt";
import express from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dbconn from "../Database/Db.js";
import verifyAdmin from "./virfayadmin.js"; 

const admin_router = express.Router();
const SECRET = "ADE car rent secret";

admin_router.post(
  "/register",
  verifyAdmin,
  [
    check("Fname").notEmpty().isAlpha().withMessage("First name must be letters only"),
    check("Lname").notEmpty().isAlpha().withMessage("Last name must be letters only"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    check("phone").isLength({ min: 6, max: 15 }).isNumeric().withMessage("Phone number must be 6-15 digits"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { Fname, Lname, email, password, phone } = req.body;
      const hashed = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO admins (Fname, Lname, email, password, phone) VALUES (?, ?, ?, ?, ?)";
      dbconn.query(sql, [Fname, Lname, email, hashed, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Admin registration successful!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Admin login
admin_router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const sql = "SELECT * FROM admins WHERE email = ?";

      dbconn.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Admin not found" });

        const admin = result[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (isMatch) {
          const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin" }, SECRET, { expiresIn: "1h" });
          res.json({ message: "Login successful", token });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Protected dashboard route
admin_router.get("/dashboard-data", verifyAdmin, (req, res) => {
  // Use verifyAdmin here, not verifyAdminToken
  res.json({ message: "This is secure admin data", admin: req.admin });
});

export default admin_router;
