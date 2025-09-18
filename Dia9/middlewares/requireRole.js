export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ msg: "No autorizado. Inicie sesión primero." });
}

export function requireRole(rol) {
  return (req, res, next) => {
    if (req.user && req.user.rol === rol) return next();
    return res.status(403).json({ msg: "No tiene permisos para esta acción." });
  };
}