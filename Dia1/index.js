// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
import express from "express" // Importar express
const app = express(); // Definir app para usar express
app.use(express.json());// Volver las respuestas de express en formato json
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
import dotenv from 'dotenv';// Importar dotenv
dotenv.config();// Cargar las variables de entorno del archivo .env
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
import {MongoClient} from "mongodb"// Requerir mongodb
// Llamar variables entorno
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
// Funcion para la conexion de la base de datos
async function conectar(coleccion) {
    try {

        // Función connect y verficación 
        await client.connect();
        console.log("Conectado a MongoDB correctamente");
        // Elegimos la base de datos y la colección que usamos con el parámetro de la funcion
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(coleccion);
        return { db, collection }; // devuelve la colección para usarla
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
    }
}
// Funcion para crear las colecciones en mongo
async function crearColecciones() {
    let { db } = await conectar("")
    await db.createCollection("campers")
    await db.createCollection("trainers")
    await db.createCollection("coordinador")
    await db.createCollection("salones")
    await db.createCollection("horarios")
    await db.createCollection("rutas")
}
// Funcion para desconectar mongo db
async function desconectarDb() {
    await client.close()
}
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
const PORT = process.env.PORT;// Definimos e puerto del servidor local
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// Endpoint asincrono para crear la base de datos de campus
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
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// Endpoint asincrono para crear campers con su informacion atravez de un metodo post con la informacion del camper en archivo json
app.post('/crearEstudiante', async (req, res) => {
    async function crearEstudiante() {
        try {
            let { collection } = await conectar("campers")
            let uCamper = await collection.find().toArray()
            console.log(uCamper);

            let infoCrearEst = req.body;
            console.log(infoCrearEst);
            infoCrearEst.idCamper = (uCamper.at(-1)?.idCamper ?? -1) + 1;
            console.log(infoCrearEst.idCamper);

            await collection.insertOne(infoCrearEst)
            res.send('Camper ingresado correctamente')
        } catch {
            res.send("error en insertar usuario");
        }
    }
    await crearEstudiante()
})
///hola :)
//  curl -X POST http://localhost:6969/crearEstudiante   -H "Content-Type: application/json"   -d '{"contrasena":"1","nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890","estado":"activo"}'
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// endpoint para obtener la informacion de un camper por id, autenticando la contraseña
app.get('/campers/:idCamper,:contrasena/verMiInfo', async (req, res) => {
    async function buscarCamper() {
        try {
            let { collection } = await conectar("campers");
            let id = req.params.idCamper;
            let contraseña=String(req.params.contrasena)
            let camper = await collection.findOne({ "idCamper": Number(id) })
            console.log(camper);
            if(camper.contrasena==contraseña){
            res.json({
                "idCamper":camper.idCamper,
                "nombre":camper.nombre,
                "apellido":camper.apellido,
                "acudiente":camper.acudiente,
                "telefono":camper.telefono,
                "estado":camper.estado
            })
        }else{
            res.json("id o contraseña incorrectos")
        }
        } catch (e){
            console.log(e,'error en crear colecciones')
        }
    }
    await buscarCamper();
}
);
// curl http://localhost:6969/campers/0,1/verMiInfo
























/////////////TRainers Crear


app.post('/crearTrainer', async (req, res) => {
    async function crearTrainer() {
        try {
            let { collection } = await conectar("trainers")
            let uTrainer = await collection.find().toArray()
            console.log(uTrainer);

            let infoCrearTra = req.body;
            console.log(infoCrearTra);
            infoCrearTra.idTrainer = (uTrainer.at(-1)?.idTrainer ?? -1) + 1;
            console.log(infoCrearTra.idTrainers);

            await collection.insertOne(infoCrearTra)
            res.send('Trainer ingresado correctamente')
        } catch {
            res.send("error en insertar usuario");
        }
    }
    await crearTrainer()
})

//  curl -X POST http://localhost:6969/crearTrainer   -H "Content-Type: application/json"   -d '{"contrasena":"2","nombre":"Pedro","apellido":"Gomez","telefono":"3164372414","idHorario":1,"idGrupos":2}'

 
//// Trainer verInfo
app.get('/trainers/:idTrainer,:contrasena/verMiInfo', async (req, res) => {
    async function buscarTrainer() {
        try {
            let { collection } = await conectar("trainers");
            let id = req.params.idTrainer;
            let contraseña=String(req.params.contrasena)
            let trainer = await collection.findOne({ "idTrainer": Number(id) })
            console.log(trainer);
            if(trainer.contrasena==contraseña){
            res.json({
                "idTrainer":trainer.idTrainer,
                "nombre":trainer.nombre,
                "apellido":trainer.apellido,
                "telefono":trainer.telefono,
                "horario":trainer.idHorarios,           
                "grupos":trainer.idGrupos,
                })
        }else{
            res.json("id o contraseña incorrectos")
        }
        } catch (e){
            console.log(e,'error en crear colecciones')
        }
    }
    await buscarTrainer();
}
);

// curl http://localhost:6969/trainers/0,2/verMiInfo
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

// crear rutas 

app.post('/crearRuta', async (req, res) => {
    async function crearRuta() {
        try {
            let { collection } = await conectar("rutas")
            let uRuta = await collection.find().toArray()
            console.log(uRuta);

            let infoCrearRuta = req.body;
            console.log(infoCrearRuta);
            infoCrearRuta.idRuta = (uRuta.at(-1)?.idRuta ?? -1) + 1;
            console.log(infoCrearRuta.idRuta);

            await collection.insertOne(infoCrearRuta)
            res.send('ruta ingresado correctamente')
        } catch {
            res.send("error en insertar ruta");  
        }
    }
    await crearRuta()
})


//  curl -X POST http://localhost:6969/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Nodejs","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","MySQL":"","Express":""}'
//  curl -X POST http://localhost:6969/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"NetCore","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","C##":"","postgreSQL":"","NetCore":""}'
//  curl -X POST http://localhost:6969/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Java","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","postgreSQL":"","SpringBoot":""}'


// crear Horario 

app.post('/crearHorario', async (req, res) => {
    async function crearHorario() {
        try {
            let { collection } = await conectar("horarios")
            let uRuta = await collection.find().toArray()
            console.log(uHorario);

            let infoCrearHorario = req.body;
            console.log(infoCrearHorario);
            infoCrearHorario.idHorario = (uHorario.at(-1)?.idHorario ?? -1) + 1;
            console.log(infoCrearHorario.idHorario);

            await collection.insertOne(infoCrearHorario)
            res.send('horario ingresado correctamente')
        } catch {
            res.send("error en insertar horario");  
        }
    }
    await crearHorario()
}) 

//  curl -X POST http://localhost:6969/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada1","horas":"6am a 10am"}'
//  curl -X POST http://localhost:6969/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada2","horas":"10am a 2pm"}'
//  curl -X POST http://localhost:6969/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada3","horas":"2pm a 6pm"}'
//  curl -X POST http://localhost:6969/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada4","horas":"6pm a 10pm"}'


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// llamar a el servidor para ejecutar los endpoints
app.listen(PORT, () => {
    console.log("server iniciadoo");
}
);
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################