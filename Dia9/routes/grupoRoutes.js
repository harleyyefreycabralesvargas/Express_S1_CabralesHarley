import express from "express";
import { crearGrupo, listarGrupos } from "../controllers/grupoController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.post("/crear", ensureAuthenticated, requireRole("coordinador"), crearGrupo);
router.get("/", ensureAuthenticated, listarGrupos);

export default router;