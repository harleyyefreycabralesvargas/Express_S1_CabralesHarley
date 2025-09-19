import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {conectar,desconectarDb} from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { nombre, contrasena } = req.body;
  try {
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

    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    const valido = await bcrypt.compare(contrasena, user.contrasena);
    if (!valido) return res.status(401).json({ msg: "Contraseña incorrecta" });
    const secret=process.env.JWT_SECRET
    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, rol }, 
      secret,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login exitoso", rol, token });

  } catch (err) {
    res.status(500).json({ msg: "Error en login", error: err.message });
  }
};

export const verSesion = (req, res) => {
  // Si llegaste aquí es porque Passport-JWT ya validó el token
  res.json({
    msg: "Sesión activa",
    user: {
      id: req.user._id,
      nombre: req.user.nombre,
      rol: req.user.rol
    }
  });
};