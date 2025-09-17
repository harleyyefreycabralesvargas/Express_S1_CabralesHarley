import express from "express";
import { verEstado, verGrupo, verRuta } from "../controllers/camperController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

// todas las rutas requieren camper logueado
router.use(ensureAuthenticated, requireRole("camper"));

router.get("/estado", verEstado);
router.get("/grupo", verGrupo);
router.get("/ruta", verRuta);

export default router;