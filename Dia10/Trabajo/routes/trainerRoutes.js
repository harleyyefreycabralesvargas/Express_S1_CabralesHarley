import express from "express";
import {
  verGruposAsignados,
  verCampersDeGrupo,
  asignarNota,
  verHorarios
} from "../controllers/trainerController.js";
import { ensureAuthenticated, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// todas las rutas requieren trainer logueado
router.use(ensureAuthenticated, requireRole("trainer"));

router.get("/grupos", verGruposAsignados);
router.get("/grupos/:idGrupo/campers", verCampersDeGrupo);
router.post("/nota", asignarNota);
router.get("/horarios", verHorarios);

export default router;