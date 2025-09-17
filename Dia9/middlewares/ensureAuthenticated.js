export function ensureAuthenticated(req, res, next) {
  console.log("DEBUG >> Auth:", req.isAuthenticated?.(), "User:", req.user);
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).send("No autorizado. Inicie sesión primero.");
}