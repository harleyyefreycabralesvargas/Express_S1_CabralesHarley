import passport from "passport";

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ msg: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ msg: "Sesión iniciada", rol: user.rol, usuario: user.nombre });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.json({ msg: "Sesión cerrada" });
  });
};

export const verSesion = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "Sesión activa",
      user: req.user
    });
  }
  res.status(401).json({ message: "No hay sesión activa" });
};