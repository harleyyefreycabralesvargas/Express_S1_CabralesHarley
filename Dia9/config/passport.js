import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { conectar } from "./db.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

// Estrategia de login para coordinadores
passport.use("coordinador-local", new LocalStrategy({
  usernameField: "nombre",
  passwordField: "contrasena"
}, async (nombre, contrasena, done) => {
  try {
    const coordinadores = await conectar("coordinador");
    const user = await coordinadores.findOne({ nombre });

    if (!user) return done(null, false, { message: "Usuario no encontrado" });

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return done(null, false, { message: "Contraseña incorrecta" });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Guardar en la sesión SOLO el id del usuario
passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // guardar como string
});

passport.deserializeUser(async (id, done) => {
  try {
    const coordinadores = await conectar("coordinador");
    const user = await coordinadores.findOne({ _id: new ObjectId(id) }); // convertir a ObjectId
    done(null, user);
  } catch (err) {
    done(err);
  }
});