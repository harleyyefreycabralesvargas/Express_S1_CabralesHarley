import express from "express";
import { crearRuta, listarRutas } from "../controllers/rutaController.js";
import { ensureAuthenticated, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post(
    "/crear",
    ensureAuthenticated,      
    requireRole("coordinador"),  
    crearRuta
);


router.get(
    "/",
    ensureAuthenticated,      
    listarRutas
);

export default router;