import express from "express";
import {
  aprobarCamper,
  asignarTrainerGrupo,
  asignarCamperGrupo,
  listarGrupos,
  listarRutas,
  listarCampers,
  listarTrainers,
  crearHorario,
  listarHorarios
} from "../controllers/coordinadorController.js";
import { ensureAuthenticated, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// todas las rutas requieren coordinador logueado
router.use(ensureAuthenticated, requireRole("coordinador"));

router.post("/aprobar/:id", aprobarCamper);
router.post("/asignar-trainer", asignarTrainerGrupo);
router.post("/asignar-camper", asignarCamperGrupo);

router.get("/grupos", listarGrupos);
router.get("/rutas", listarRutas);
router.get("/campers", listarCampers);
router.get("/trainers", listarTrainers);

router.post("/horarios", crearHorario);
router.get("/horarios", listarHorarios);

export default router;