export function requireRole(rolPermitido) {
    return (req, res, next) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send("No autorizado. Inicie sesión primero.");
      }
      if (req.user?.rol !== rolPermitido) {
        return res.status(403).send("No tienes permisos para esta acción");
      }
      next();
    };
  }