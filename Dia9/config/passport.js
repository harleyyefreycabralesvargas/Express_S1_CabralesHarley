import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import {conectar,desconectarDb} from "./db.js";

passport.use(new LocalStrategy(
  { usernameField: "nombre", passwordField: "contrasena" },
  async (nombre, contrasena, done) => {
    try {
      // Revisar en todas las colecciones de usuarios
      const roles = ["coordinador", "trainer", "camper"];

      let user = null;
      let rol = null;

      for (const r of roles) {
        const db = await conectar(r);
        const encontrado = await db.findOne({ nombre });
        if (encontrado) {
          user = encontrado;
          rol = r;
          break;
        }
      }

      if (!user) return done(null, false, { message: "Usuario no encontrado" });

      // Validar contraseña
      const esValido = await bcrypt.compare(contrasena, user.contrasena);
      if (!esValido) return done(null, false, { message: "Contraseña incorrecta" });

      user.rol = rol; // Guardamos el rol
      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }
));

// Serializar usuario en sesión
passport.serializeUser((user, done) => {
  done(null, { id: user._id, rol: user.rol });
});

// Deserializar al hacer peticiones
passport.deserializeUser(async (obj, done) => {
  try {
    const db = await conectar(obj.rol);
    const user = await db.findOne({ _id: obj.id });
    done(null, { ...user, rol: obj.rol });
  } catch (err) {
    done(err);
  }
});

export default passport;