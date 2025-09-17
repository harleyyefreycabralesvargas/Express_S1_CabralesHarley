import express from "express";
import { login, logout, verSesion } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/session", verSesion);

export default router;