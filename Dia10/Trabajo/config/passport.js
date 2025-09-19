import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import {conectar,desconectarDb} from "./db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      console.log("Payload recibido en JWT:", jwt_payload);

      // validar que el payload traiga id y rol
      if (!jwt_payload.id || !jwt_payload.rol) {
        console.log("Payload sin id o rol");
        return done(null, false);
      }

      // conectar a la colección del rol correspondiente
      const db = await conectar(jwt_payload.rol);

      // buscar el usuario con ObjectId
      const user = await db.findOne({ _id: new ObjectId(jwt_payload.id) });

      if (user) {
        console.log("Usuario encontrado:", user.nombre, "Rol:", jwt_payload.rol);
        return done(null, { ...user, rol: jwt_payload.rol });
      } else {
        console.log("Usuario no encontrado en BD");
        return done(null, false);
      }
    } catch (err) {
      console.error("Error en JwtStrategy:", err.message);
      return done(err, false);
    }
  })
);

export default passport;