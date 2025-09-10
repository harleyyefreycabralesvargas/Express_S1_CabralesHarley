import express from "express" // Importar express
const app = express(); // Definir app para usar express
app.use(express.json());// Volver las respuestas de express en formato json
import swaggerUI from 'swagger-ui-express'
import swaggerDocumentation from './swagger.json'  with { type: 'json' };
app.use('/doc',swaggerUI.serve,swaggerUI.setup(swaggerDocumentation))
import dotenv from 'dotenv';// Importar dotenv
dotenv.config();// Cargar las variables de entorno del archivo .env
import { MongoClient } from "mongodb"// Requerir mongodb
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
    await db.createCollection("grupos")
}
// Funcion para desconectar mongo db
async function desconectarDb() {
    await client.close()
}
const PORT = process.env.PORT;// Definimos e puerto del servidor local
// Endpoint asincrono para crear la base de datos de campus
app.get('/crearColecciones', async (req, res) => {
    async function CrearColeccion() {
        try {
            await crearColecciones();
            res.status(201).send('colecciones creadas con exito');
        } catch {
            res.status(409).send('las colecciones ya existen');
            res.status(500).send('error en en servidor al crear colecciones')
        }
    }
    await CrearColeccion();
}
);
//  curl http://localhost:2512/crearColecciones

// crear  coordinador

app.post('/crearCoordinador', async (req, res) => {
    async function crearCoordinador() {
        try {
            let { collection } = await conectar("coordinador")
            let uCoordinador = await collection.find().toArray()
            console.log(uCoordinador);

            let infoCrearCoordinador = req.body;
            console.log(infoCrearCoordinador);
            infoCrearCoordinador.idCoordinador = (uCoordinador.at(-1)?.idCoordinador ?? -1) + 1;
            console.log(infoCrearCoordinador.idCoordinador);

            await collection.insertOne(infoCrearCoordinador)
            res.status(201).send('coordiandor ingresado correctamente')
        } catch {
            res.status(400).send("error en insertar cordinador, campos no validos");
            res.status(500).send('error en el servidor al crear coordinador')
        }
    }
    await crearCoordinador()
})
//  curl -X POST http://localhost:2512/crearCoordinador   -H "Content-Type: application/json"   -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez"}'

// Endpoint asincrono para crear campers con su informacion atravez de un metodo post con la informacion del camper en archivo json
app.post('/coordinador/:idCoordinador/:contrasena/crearEstudiante', async (req, res) => {
    async function crearEstudiante() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("campers")
                let uCamper = await collection.find().toArray()
                console.log(uCamper);
                let infoCrearEst = req.body;
                console.log(infoCrearEst);
                infoCrearEst.estado = "Inscrito"
                infoCrearEst.idCamper = (uCamper.at(-1)?.idCamper ?? -1) + 1;
                console.log(infoCrearEst.idCamper);
                await collection.insertOne(infoCrearEst)
                res.status(201).send('camper ingresado correctamente')
            } else {
                res.status(401).json("id o contraseña incorrectos")
            }
        }catch (err) {
            console.error(err);
            if (err.message.includes("validation")) {
                res.status(400).send("Campos inválidos");
            } else {
                res.status(500).send("Error del servidor");
            }
        }
    }
    await crearEstudiante()
})
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearEstudiante   -H "Content-Type: application/json"   -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890"}'
 
//TRainers Crear

app.post('/coordinador/:idCoordinador/:contrasena/crearTrainer', async (req, res) => {
    async function crearTrainer() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(await coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("trainers")
                let uTrainer = await collection.find().toArray()
                console.log(uTrainer);
                let infoCrearTra = req.body;
                console.log(infoCrearTra);
                infoCrearTra.idTrainer = (uTrainer.at(-1)?.idTrainer ?? -1) + 1;
                console.log(infoCrearTra.idTrainers);
                await collection.insertOne(infoCrearTra)
                res.status(201).send('trainer ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (err){
            console.error(err);
            if (err.message.includes("validation")) {
                res.status(400).send("Campos inválidos");
            } else {
                res.status(500).send("Error del servidor");
            }}
    }
    await crearTrainer()
})

//  curl -X POST http://localhost:2512/coordinador/0/1234/crearTrainer   -H "Content-Type: application/json"   -d '{"contrasena":"2","nombre":"Pedro","apellido":"Gomez","telefono":"3164372414","idHorario":1,"idGrupos":2}'

// crear Horario 

app.post('/coordinador/:idCoordinador,:contrasena/crearHorario', async (req, res) => {
    async function crearHorario() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);
            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("horarios")
                let uHorario = await collection.find().toArray()
                console.log(uHorario);
                let infoCrearHorario = req.body;
                console.log(infoCrearHorario);
                infoCrearHorario.idHorario = (uHorario.at(-1)?.idHorario ?? -1) + 1;
                console.log(infoCrearHorario.idHorario);
                await collection.insertOne(infoCrearHorario)
                res.status(201).send('horario ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (err){
            console.error(err);
            if (err.message.includes("validation")) {
                res.status(400).send("Campos inválidos");
            } else {
                res.status(500).send("Error del servidor");
            }}
    }
    await crearHorario()
})

//  curl -X POST http://localhost:2512/coordinador/0/1234/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada1","horas":"6am a 10am"}'
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada2","horas":"10am a 2pm"}'
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada3","horas":"2pm a 6pm"}'
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada4","horas":"6pm a 10pm"}'

// crear rutas 

app.post('/coordinador/:idCoordinador,:contrasena/crearRuta', async (req, res) => {
    async function crearRuta() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);

            let contraseña = String(req.params.contrasena)
            console.log(contraseña);

            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);

            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("rutas")
                let uRuta = await collection.find().toArray()
                console.log(uRuta);

                let infoCrearRuta = req.body;
                console.log(infoCrearRuta);
                infoCrearRuta.idRuta = (uRuta.at(-1)?.idRuta ?? -1) + 1;
                console.log(infoCrearRuta.idRuta);

                await collection.insertOne(infoCrearRuta)
                res.status(201).send('ruta ingresada correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (err) {
            console.error(err);
            if (err.message.includes("validation")) {
                res.status(400).send("Campos inválidos");
            } else {
                res.status(500).send("Error del servidor");
            }}
    }
    await crearRuta()
})


//  curl -X POST http://localhost:2512/coordinador/0/1234/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Nodejs","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","MySQL":"","Express":""}'
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"NetCore","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","C##":"","postgreSQL":"","NetCore":""}'
//  curl -X POST http://localhost:2512/coordinador/0/1234/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Java","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","postgreSQL":"","SpringBoot":""}'

// crear salones

app.post('/coordinador/:idCoordinador/:contrasena/crearGrupos', async (req, res) => {
    async function crearGrupo() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);
            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("grupos")
                let uGrupo = await collection.find().toArray()
                console.log(uGrupo);

                let infoCrearGrupo = req.body;
                console.log(infoCrearGrupo);
                infoCrearGrupo.idGrupo = (uGrupo.at(-1)?.idGrupo ?? -1) + 1;
                console.log(infoCrearGrupo.idGrupo);

                await collection.insertOne(infoCrearGrupo)
                res.status(201).send(`grupo ingresado ${req.body.nombreRuta} correctamente`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (err){
            console.error(err);
            if (err.message.includes("validation")) {
                res.status(400).send("Campos inválidos");
            } else {
                res.status(500).send("Error del servidor");
            }}
    }
    await crearGrupo()
})


//  curl -X POST http://localhost:2512/coordinador/0/1234/crearGrupos   -H "Content-Type: application/json"   -d '{"nombreGrupo":"S1"}'

// mostrar camper inscritos
app.get('/coordinador/:idCoordinador/:contrasena/aprobarCamper', async (req, res) => {
    async function buscarCamper() {

        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("campers");
                let camper = await collection.find({ estado: "Inscrito" }).toArray();
                res.status(200).json(camper)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para obtener campers inscritos");
        }
    }

    await buscarCamper();
});

//curl http://localhost:2512/coordinador/0/1234/aprobarCamper

// aprobar camper
app.put('/coordinador/:idCoordinador/:contrasena/aprobarCamper/:idCamper', async (req, res) => {
    async function crearGrupo() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let identificador = req.params.idCamper
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);
            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                let { collection } = await conectar("campers")
                console.log(await collection.findOne())
                console.log(Number(identificador));
                await collection.updateOne(
                    { "idCamper": Number(identificador) },
                    { $set: { "estado": "Aprobado" } }
                )
                res.status(200).send(`Camper ${identificador} aprobado`)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para aprobar camper");
        }
    }
    await crearGrupo()
}) 

// curl -X PUT "http://localhost:2512/coordinador/0/1234/aprobarCamper/1"

// asignar ruta a grupo

app.put('/coordinador/:idCoordinador/:contrasena/asignarGrupoRuta/:idGrupo/:idRuta', async (req, res) => {
    async function crearGrupo() {
        try {
            const { idGrupo, idRuta } = req.params;

            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            if (coordinador.contrasena == contraseña) {
                let { collection: gruposCollection } = await conectar("grupos");
                let { collection: rutasCollection } = await conectar("rutas");
                console.log(await collection.findOne())

                await gruposCollection.updateOne(
                    { "idGrupo": Number(idGrupo) },
                    { $set: { "idRuta": Number(idRuta) } }
                )
                res.status(200).json(`ruta ${idRuta} asignada`)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para asignar ruta");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoRuta/2/1

// asignar horarios
app.put('/coordinador/:idCoordinador/:contrasena/asignarGrupoHorario/:idGrupo/:idHorario', async (req, res) => {
    async function crearGrupo() {
        try {
            const { idGrupo, idHorario } = req.params;

            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            if (coordinador.contrasena == contraseña) {
                let { collection: gruposCollection } = await conectar("grupos");
                let { collection: horariosCollection } = await conectar("horarios");
                console.log(await collection.findOne())

                await gruposCollection.updateOne(
                    { "idGrupo": Number(idGrupo) },
                    { $set: { "idHorario": Number(idHorario) } }
                )
                res.status(200).json(`horario ${idHorario} asignada`)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para asignar horario");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoHorario/3/3

// asignar trainer
app.put('/coordinador/:idCoordinador/:contrasena/asignarGrupoTrainer/:idGrupo/:idTrainer', async (req, res) => {
    async function crearGrupo() {
        try {
            const { idGrupo, idTrainer } = req.params;

            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            if (coordinador.contrasena == contraseña) {
                let { collection: gruposCollection } = await conectar("grupos");
                let { collection: trainerCollection } = await conectar("trainers");
                console.log(await collection.findOne())

                await gruposCollection.updateOne(
                    { "idGrupo": Number(idGrupo) },
                    { $set: { "idTrainer": Number(idTrainer) } }
                )
                res.status(200).json(`trainer ${idTrainer} asignada`)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para asignar trainer");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoTrainer/3/5

// asignar campers
app.put('/coordinador/:idCoordinador/:contrasena/asignarGrupoCamper/:idGrupo/:idCamper', async (req, res) => {
    async function crearGrupo() {
        try {
            const { idGrupo, idCamper } = req.params;
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            let contraseña = String(req.params.contrasena)
            console.log(contraseña);
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            if (coordinador.contrasena == contraseña) {
                let { collection: gruposCollection } = await conectar("grupos");
                let { collection: campersCollection } = await conectar("campers");
                console.log(await collection.findOne())
                await gruposCollection.updateOne(
                    { "idGrupo": Number(idGrupo) },
                    { $addToSet: { "campers": Number(idCamper) } }
                )
                await campersCollection.updateOne(
                    { "idCamper": Number(idCamper) },
                    { $addToSet: { "campers": Number(idCamper) } }
                )

                res.status(200).json(`camper ${idCamper} asignado`)
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch {
            res.status(500).send("error del servidor para asignar camper");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoCamper/1/1

// Campers
// endpoint para obtener la informacion de un camper por id, autenticando la contraseña
app.get('/campers/:idCamper/:contrasena/verMiInfo', async (req, res) => {
    async function buscarCamper() {
        try {
            let { collection } = await conectar("campers");
            let id = req.params.idCamper;
            let contraseña = String(req.params.contrasena)
            let camper = await collection.findOne({ "idCamper": Number(id) })
            console.log(camper);
            if (camper.contrasena == contraseña) {
                res.status(200).json({
                    camper
                })
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch (e) {
            res.status(500).send("error del servidor para ver informacionde camper");
        }
    }
    await buscarCamper();

}
);



// curl http://localhost:2512/campers/0/1234/verMiInfo

// trainers
//// Trainer verInfo
app.get('/trainers/:idTrainer/:contrasena/verMiInfo', async (req, res) => {
    async function buscarTrainer() {
        try {
            let { collection } = await conectar("trainers");
            let id = req.params.idTrainer;
            let contraseña = String(req.params.contrasena)
            let trainer = await collection.findOne({ "idTrainer": Number(id) })
            console.log(trainer);
            if (trainer.contrasena == contraseña) {
                res.status(200).json({
                    trainer
                })
            } else {
                res.status(401).send("credenciales invalidas")
            }
        } catch (e) {
            res.status(500).send("error del servidor para ver informacion de trainer");
        }
    }
    await buscarTrainer();
}
);

// curl http://localhost:2512/trainers/0/1234/verMiInfo




// llamar a el servidor para ejecutar los endpoints
app.listen(PORT, () => {
    console.log("server iniciadoo");
}
);


