import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyUser;
