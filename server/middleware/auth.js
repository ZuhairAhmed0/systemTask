import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    const err = new Error("Access token is missing");
    err.status = 401;
    return next(err);
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    err.message = "Invalid access token";
    err.status = 401;
    return next(err);
  }
};
