import express from "express";
import { login, verSesion } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/session", verSesion);

export default router;