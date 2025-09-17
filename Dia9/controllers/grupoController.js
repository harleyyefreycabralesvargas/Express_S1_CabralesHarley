import { conectar } from "../config/db.js";

// Crear grupo
export const crearGrupo = async (req, res) => {
  try {
    const grupos = await conectar("grupos");
    const lista = await grupos.find().toArray();

    const info = req.body;
    info.idGrupo = (lista.at(-1)?.idGrupo ?? -1) + 1;
    info.creadoPor = { id: req.user._id, nombre: req.user.nombre, rol: req.user.rol };

    await grupos.insertOne(info);
    res.status(201).json({ message: "Grupo creado", grupo: info });
  } catch (err) {
    res.status(500).send("Error al crear grupo");
  }
};

// Listar grupos
export const listarGrupos = async (req, res) => {
  try {
    const grupos = await conectar("grupos");
    const lista = await grupos.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar grupos");
  }
};