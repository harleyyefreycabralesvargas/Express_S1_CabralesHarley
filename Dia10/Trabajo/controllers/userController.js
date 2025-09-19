import { conectar } from "../config/db.js";
import bcrypt from "bcrypt";

async function crearUsuario(req, res, tipo) {
  try {
    const collection = await conectar(tipo);
    const lista = await collection.find().toArray();

    let info = req.body;
    info.id = (lista.at(-1)?.id ?? -1) + 1;
    info.rol = tipo; // coordinador / trainer / camper
    info.contrasena = await bcrypt.hash(info.contrasena, 10);

    await collection.insertOne(info);
    res.status(201).json({ message: `${tipo} creado`, id: info.id });
  } catch (err) {
    res.status(500).send(`Error al crear ${tipo}`);
  }
}

export const crearCoordinador = (req, res) => crearUsuario(req, res, "coordinador");
export const crearTrainer = (req, res) => crearUsuario(req, res, "trainer");
export const crearCamper = (req, res) => crearUsuario(req, res, "camper");