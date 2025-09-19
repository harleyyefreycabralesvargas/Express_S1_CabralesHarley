import { conectar } from "../config/db.js";

// Aprobar Camper
export const aprobarCamper = async (req, res) => {
  try {
    const campers = await conectar("camper");
    await campers.updateOne(
      { id: parseInt(req.params.id) },
      { $set: { estado: "aprobado" } }
    );
    res.json({ message: `Camper ${req.params.id} aprobado` });
  } catch (err) {
    res.status(500).send("Error al aprobar camper");
  }
};

// Asignar Trainer a Grupo
export const asignarTrainerGrupo = async (req, res) => {
  try {
    const { idGrupo, idTrainer } = req.body;
    const grupos = await conectar("grupos");
    await grupos.updateOne({ idGrupo }, { $set: { idTrainer } });
    res.json({ message: `Trainer ${idTrainer} asignado al grupo ${idGrupo}` });
  } catch (err) {
    res.status(500).send("Error al asignar trainer");
  }
};

// Asignar Camper a Grupo
export const asignarCamperGrupo = async (req, res) => {
  try {
    const { idGrupo, idCamper } = req.body;
    const grupos = await conectar("grupos");
    await grupos.updateOne({ idGrupo }, { $push: { campers: idCamper } });
    res.json({ message: `Camper ${idCamper} asignado al grupo ${idGrupo}` });
  } catch (err) {
    res.status(500).send("Error al asignar camper");
  }
};

// Listar Grupos
export const listarGrupos = async (req, res) => {
  try {
    const grupos = await conectar("grupos");
    const lista = await grupos.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar grupos");
  }
};

// Listar Rutas
export const listarRutas = async (req, res) => {
  try {
    const rutas = await conectar("rutas");
    const lista = await rutas.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar rutas");
  }
};

// Listar Campers
export const listarCampers = async (req, res) => {
  try {
    const campers = await conectar("camper");
    const lista = await campers.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar campers");
  }
};

// Listar Trainers
export const listarTrainers = async (req, res) => {
  try {
    const trainers = await conectar("trainer");
    const lista = await trainers.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar trainers");
  }
};

// Crear Horario
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

// Listar Horarios
export const listarHorarios = async (req, res) => {
  try {
    const horarios = await conectar("horarios");
    const lista = await horarios.find().toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al listar horarios");
  }
};