import passport from "passport";

export const login = (req, res, next) => {
  passport.authenticate("coordinador-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login exitoso",
        user: { id: user._id, nombre: user.nombre, rol: user.rol }
      });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.clearCookie("connect.sid");
    res.status(200).send("Sesión cerrada correctamente");
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