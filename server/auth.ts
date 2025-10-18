import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  // Check for Basic Auth header (from browser popup)
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Basic ")) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii",
    );
    const [username, password] = credentials.split(":");

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return next();
    }
  }

  // Check for session-based auth (from your login form)
  // @ts-ignore - session may not be typed
  if (req.session && req.session.isAuthenticated) {
    return next();
  }

  res.status(401).json({ message: "Unauthorized" });
};
