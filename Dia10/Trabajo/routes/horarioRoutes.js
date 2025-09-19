import express from "express";
import { crearHorario, listarHorarios } from "../controllers/horarioController.js";
import { ensureAuthenticated, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/crear", ensureAuthenticated, requireRole("coordinador"), crearHorario);
router.get("/", ensureAuthenticated, listarHorarios);

export default router;