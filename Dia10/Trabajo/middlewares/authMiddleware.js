import passport from "passport";

export const ensureAuthenticated = passport.authenticate("jwt", { session: false });

export function requireRole(rol) {
  return (req, res, next) => {
    if (req.user && req.user.rol === rol) {
      return next();
    }
    return res.status(403).json({ msg: "No tiene permisos para esta acción." });
  };
}