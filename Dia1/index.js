
const express = require('express');
const app = express();


app.use(express.json());

require('dotenv').config();

const PORT = process.env.PORT;

// Requerir mongodb
const { MongoClient } = require("mongodb");
// Importar variables de entorno
require('dotenv').config()

// Llamar variables entorno
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// FUNCIÓN CONECTAR A DB Y COLECCIÓN usando try catch
async function conectar(coleccion) {
    try {

        // Función connect y verficación 
        await client.connect();
        console.log("Conectado a MongoDB correctamente");
        // Elegimos la base de datos y la colección que usamos con el parámetro de la funcion

        const db = client.db(process.env.DB_NAME);
        if (!db.collection("personas")) {
            await crearColecciones()
        }
        const collection = db.collection(coleccion);
        return { db, collection }; // devuelve la colección para usarla
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
    }
}
async function crearColecciones() {
    let { db } = await conectar("")
    await db.createCollection("campers")
    await db.createCollection("trainers")
    await db.createCollection("coordinador")
    await db.createCollection("salones")
    await db.createCollection("horarios")
}

async function desconectarDb() {
    await client.close()
}

// endpoint para crear la base de datos de campus
app.get('/crearColecciones', async (req, res) => {
    async function llamarCrearColeccion() {
        try {
            await crearColecciones();
            res.send('colecciones creadas con exito')
        } catch {
            res.send('error en crear colecciones')
        }
    }
    await llamarCrearColeccion();
}
);
//  curl http://localhost:6969/crearColecciones

// endpoint para crear campers con su informacion atravez de una metodo post con la informacion del camper en archivo json
app.post('/crearEstudiante', async (req, res) => {
    async function crearEstudiante() {
        try {
            let { collection } = await conectar("campers")
            let uCamper = await collection.find().toArray()
            console.log(uCamper);
            console.log(uCamper.at(-1).idCamper);

            let infoCrearEst = req.body;
            infoCrearEst.idCamper = uCamper.at(-1).idCamper + 1 || 0

            await collection.insertOne(infoCrearEst)
            res.send('Camper ingresado correctamente')
        } catch {
            res.send("error en insertar usuario");
        }
    }
    await crearEstudiante()
})
//  curl -X POST http://localhost:6969/crearEstudiante   -H "Content-Type: application/json"   -d '{"nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890","estado":"activo"}'


// endpoint para obtener la informacion de un camper por id
app.get('/campers/:idCamper', async (req, res) => {
    async function buscarCamper() {
        try {
            let { collection } = await conectar("campers");
            let id = req.params.idCamper;
            let camper = await collection.findOne({ "idCamper": Number(id) })
            console.log(camper);
            res.json({
                msg: 'Camper encontrado con exito',
                data: camper
            })
        } catch {
            console.log('error en crear colecciones')
        }
    }
    await buscarCamper();
}
);
// //localhost:6969/campers/1

// llamar a el servidor
app.listen(PORT, () => {
    console.log("server iniciadoo");
}
);