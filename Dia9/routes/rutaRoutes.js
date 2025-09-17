import express from "express";
import { crearRuta, listarRutas } from "../controllers/rutaController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.post("/crear", ensureAuthenticated, requireRole("coordinador"), crearRuta);
router.get("/", ensureAuthenticated, listarRutas);

export default router;