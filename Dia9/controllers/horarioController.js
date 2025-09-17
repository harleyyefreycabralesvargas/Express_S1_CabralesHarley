import { conectar } from "../config/db.js";

// Crear horario
export const crearHorario = async (req, res) => {
  try {
    const horarios = await conectar("horarios");
    const lista = await horarios.find().toArray();

    const info = req.body;
    info.idHorario = (lista.at(-1)?.idHorario ?? -1) + 1;

    await horarios.insertOne(info);
    res.status(201).json({ message: "Horario creado", horario: info });
  } catch (err) {
    res.status(500).send("Error al crear horario");
  }
};

// Listar horarios
export const listarHorarios = async (req, res) => {
  try {
    const horarios = await conectar("horarios");
    const lista = await horarios.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar horarios");
  }
};