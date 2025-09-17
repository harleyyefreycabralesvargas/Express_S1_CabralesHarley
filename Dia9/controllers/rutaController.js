import { conectar } from "../config/db.js";

// Crear ruta
export const crearRuta = async (req, res) => {
  try {
    const rutas = await conectar("rutas");
    const lista = await rutas.find().toArray();

    const info = req.body;
    info.idRuta = (lista.at(-1)?.idRuta ?? -1) + 1;

    await rutas.insertOne(info);
    res.status(201).json({ message: "Ruta creada", ruta: info });
  } catch (err) {
    res.status(500).send("Error al crear ruta");
  }
};

// Listar rutas
export const listarRutas = async (req, res) => {
  try {
    const rutas = await conectar("rutas");
    const lista = await rutas.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar rutas");
  }
};