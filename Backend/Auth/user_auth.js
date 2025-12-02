import bcrypt from "bcrypt";
import express from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dbconn from "../Database/Db.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post(
  "/Register",
  [
    check("Fname").notEmpty().withMessage("First name is required").isAlpha().withMessage("First name must contain only letters"),
    check("Lname").notEmpty().withMessage("Last name is required").isAlpha().withMessage("Last name must contain only letters"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    check("phone").isLength({ min: 6, max: 15 }).isNumeric().withMessage("Phone must be numeric, 6-15 digits"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { Fname, Lname, email, password, phone } = req.body;
      const hashed = await bcrypt.hash(password, 10);

      // Save user in local DB only
      const sql = "INSERT INTO users (Fname, Lname, email, password, phone) VALUES (?, ?, ?, ?, ?)";
      const val = [Fname, Lname, email, hashed, phone];

      dbconn.query(sql, val, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "User registration successful!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const sql = "SELECT * FROM users WHERE email = ?";

      dbconn.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.json({ status: "failed", message: "User not found" });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ status: "failed", message: "Incorrect password" });

        const token = jwt.sign(
          { id: user.id, email: user.email },
          "secret123",
          { expiresIn: "7d" }
        );
        res.json({
          status: "success",
          token,
          user: {
            id: user.id,
            Fname: user.Fname,
            Lname: user.Lname,
            email: user.email,
          },
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);


export default router;
