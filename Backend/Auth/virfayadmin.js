import jwt from "jsonwebtoken";

const SECRET = "ADE car rent secret";

const virfayadmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
    req.admin = decoded; // attach token info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default virfayadmin;
