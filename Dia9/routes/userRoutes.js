import express from "express";
import { crearCoordinador, crearTrainer, crearCamper } from "../controllers/userController.js";

const router = express.Router();

router.post("/coordinador", crearCoordinador);
router.post("/trainer", crearTrainer);
router.post("/camper", crearCamper);

export default router;