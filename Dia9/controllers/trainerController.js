import { conectar } from "../config/db.js";

// Ver Grupos del Trainer
export const verGruposAsignados = async (req, res) => {
  try {
    const grupos = await conectar("grupos");
    const lista = await grupos.find({ idTrainer: req.user.id }).toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al obtener grupos del trainer");
  }
};

// Ver Campers de un Grupo
export const verCampersDeGrupo = async (req, res) => {
  try {
    const { idGrupo } = req.params;
    const grupos = await conectar("grupos");
    const grupo = await grupos.findOne({ idGrupo: parseInt(idGrupo) });
    if (!grupo) return res.status(404).send("Grupo no encontrado");

    const campers = await conectar("camper");
    const listaCampers = await campers.find({ id: { $in: grupo.campers || [] } }).toArray();
    res.json(listaCampers);
  } catch (err) {
    res.status(500).send("Error al obtener campers del grupo");
  }
};

// Asignar Nota
export const asignarNota = async (req, res) => {
  try {
    const { idCamper, nota } = req.body;
    const campers = await conectar("camper");
    await campers.updateOne({ id: parseInt(idCamper) }, { $set: { nota } });
    res.json({ message: `Nota ${nota} asignada al camper ${idCamper}` });
  } catch (err) {
    res.status(500).send("Error al asignar nota");
  }
};

// Ver Horarios del Trainer
export const verHorarios = async (req, res) => {
  try {
    const horarios = await conectar("horarios");
    const lista = await horarios.find({ idTrainer: req.user.id }).toArray();
    res.json(lista);
  } catch (err) {
    res.status(500).send("Error al obtener horarios del trainer");
  }
};