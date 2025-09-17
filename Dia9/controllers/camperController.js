import { conectar } from "../config/db.js";

// Ver Estado
export const verEstado = async (req, res) => {
  try {
    const campers = await conectar("camper");
    const camper = await campers.findOne({ id: req.user.id });
    if (!camper) return res.status(404).send("Camper no encontrado");
    res.json({ nombre: camper.nombre, estado: camper.estado, nota: camper.nota });
  } catch (err) {
    res.status(500).send("Error al obtener estado del camper");
  }
};

// Ver Grupo Asignado
export const verGrupo = async (req, res) => {
  try {
    const grupos = await conectar("grupos");
    const grupo = await grupos.findOne({ campers: req.user.id });
    if (!grupo) return res.status(404).send("No estás asignado a ningún grupo");
    res.json(grupo);
  } catch (err) {
    res.status(500).send("Error al obtener grupo");
  }
};

// Ver Ruta
export const verRuta = async (req, res) => {
  try {
    const rutas = await conectar("rutas");
    const ruta = await rutas.findOne({ idRuta: req.user.idRuta });
    if (!ruta) return res.status(404).send("Ruta no encontrada");
    res.json(ruta);
  } catch (err) {
    res.status(500).send("Error al obtener ruta");
  }
};