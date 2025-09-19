import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import "./config/passport.js";

// Importar rutas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coordinadorRoutes from "./routes/coordinadorRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import camperRoutes from "./routes/camperRoutes.js";
import grupoRoutes from "./routes/grupoRoutes.js";
import rutaRoutes from "./routes/rutaRoutes.js";
import horarioRoutes from "./routes/horarioRoutes.js";

import swaggerUI from 'swagger-ui-express'
import swaggerDocumentation from './swagger.json'  with { type: 'json' };

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({
  secret: "supersecreto",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hora
}));
app.use('/doc',swaggerUI.serve,swaggerUI.setup(swaggerDocumentation))
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/coordinador", coordinadorRoutes);
app.use("/trainer", trainerRoutes);
app.use("/camper", camperRoutes);
app.use("/grupos", grupoRoutes);
app.use("/rutas", rutaRoutes);
app.use("/horarios", horarioRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});