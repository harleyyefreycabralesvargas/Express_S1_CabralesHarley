import express from "express";
import {
  verGruposAsignados,
  verCampersDeGrupo,
  asignarNota,
  verHorarios
} from "../controllers/trainerController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

// todas las rutas requieren trainer logueado
router.use(ensureAuthenticated, requireRole("trainer"));

router.get("/grupos", verGruposAsignados);
router.get("/grupos/:idGrupo/campers", verCampersDeGrupo);
router.post("/nota", asignarNota);
router.get("/horarios", verHorarios);

export default router;