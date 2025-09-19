import express from "express";
import { crearGrupo, listarGrupos } from "../controllers/grupoController.js";
import { ensureAuthenticated, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/crear", ensureAuthenticated, requireRole("coordinador"), crearGrupo);
router.get("/", ensureAuthenticated, listarGrupos);

export default router;