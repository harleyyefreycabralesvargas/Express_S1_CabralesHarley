import express from "express" // Importar express
const app = express(); // Definir app para usar express
app.use(express.json());// Volver las respuestas de express en formato json
import dotenv from 'dotenv';// Importar dotenv
dotenv.config();// Cargar las variables de entorno del archivo .env
import swaggerUi from "swagger-ui-express";
import YAML from "./s";
// 🔹 Cargar archivo swagger.yaml
const ducumentacionSwagger = YAML.load("./swagger.yaml");

// 🔹 Ruta de documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(ducumentacionSwagger));

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
    await db.createCollection("coordinador")

    await db.createCollection("grupos")
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
    async function CrearColeccion() {
        try {
            await crearColecciones();
            res.send('colecciones creadas con exito')
        } catch {
            res.send('error en crear colecciones')
        }
    }
    await CrearColeccion();
}
);
//  curl http://localhost:6969/crearColecciones

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
            res.send('coordiandor ingresado correctamente')
        } catch {
            res.send("error en insertar cordinador");
        }
    }
    await crearCoordinador()
})
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

// Endpoint asincrono para crear campers con su informacion atravez de un metodo post con la informacion del camper en archivo json
app.post('/coordinador/:idCoordinador,:contrasena/crearEstudiante', async (req, res) => {
    async function crearEstudiante() {
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
                let { collection } = await conectar("campers")
                let uCamper = await collection.find().toArray()
                console.log(uCamper);

                let infoCrearEst = req.body;
                console.log(infoCrearEst);
                infoCrearEst.estado = "Inscrito"
                infoCrearEst.idCamper = (uCamper.at(-1)?.idCamper ?? -1) + 1;
                console.log(infoCrearEst.idCamper);

                await collection.insertOne(infoCrearEst)
                res.send('Camper ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en insertar usuario");
        }
    }
    await crearEstudiante()
})
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearEstudiante   -H "Content-Type: application/json"   -d '{"contrasena":"1","nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890"}'
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

/////////////TRainers Crear

app.post('/coordinador/:idCoordinador,:contrasena/crearTrainer', async (req, res) => {
    async function crearTrainer() {
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
                let { collection } = await conectar("trainers")
                let uTrainer = await collection.find().toArray()
                console.log(uTrainer);

                let infoCrearTra = req.body;
                console.log(infoCrearTra);
                infoCrearTra.idTrainer = (uTrainer.at(-1)?.idTrainer ?? -1) + 1;
                console.log(infoCrearTra.idTrainers);

                await collection.insertOne(infoCrearTra)
                res.send('Trainer ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }



        } catch {
            res.send("error en insertar usuario");
        }
    }
    await crearTrainer()
})

//  curl -X POST http://localhost:6969/coordinador/0,xd/crearTrainer   -H "Content-Type: application/json"   -d '{"contrasena":"2","nombre":"Pedro","apellido":"Gomez","telefono":"3164372414","idHorario":1,"idGrupos":2}'

// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
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
                res.send('horario ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en insertar horario");
        }
    }
    await crearHorario()
})

//  curl -X POST http://localhost:6969/coordinador/0,xd/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada1","horas":"6am a 10am"}'
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada2","horas":"10am a 2pm"}'
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada3","horas":"2pm a 6pm"}'
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada4","horas":"6pm a 10pm"}'


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


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
                res.send('ruta ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en insertar ruta");
        }
    }
    await crearRuta()
})


//  curl -X POST http://localhost:6969/coordinador/0,xd/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Nodejs","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","MySQL":"","Express":""}'
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"NetCore","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","C##":"","postgreSQL":"","NetCore":""}'
//  curl -X POST http://localhost:6969/coordinador/0,xd/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Java","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","postgreSQL":"","SpringBoot":""}'

// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

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
                res.send('grupo ingresado correctamente')
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en insertar grupo");
        }
    }
    await crearGrupo()
})


//  curl -X POST http://localhost:6969/coordinador/0/xd/crearGrupos   -H "Content-Type: application/json"   -d '{"nombreGrupo":"S1"}'


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

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
                res.json(camper)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en aprobar camper");
        }
    }


    await buscarCamper();
});

//curl http://localhost:6969/coordinador/0/xd/aprobarCamper


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


app.put('/coordinador/:idCoordinador/:contrasena/aprobarCamper/:idCamper', async (req, res) => {
    async function crearGrupo() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            console.log(id);
            const identificador = req.params.idCamper
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
                res.json(`Camper ${identificador} aprobado`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("error en aprobar camper");
        }
    }
    await crearGrupo()
})

// curl -X PUT "http://localhost:6969/coordinador/0/xd/aprobarCamper/1"

// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


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
                res.json(`ruta ${idRuta} asignada`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("ruta asignada");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:6969/coordinador/0/xd/asignarGrupoRuta/2/1


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################

// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


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
                res.json(`horario ${idHorario} asignada`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("horario no asignada");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:6969/coordinador/0/xd/asignarGrupoHorario/3/3


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


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
                res.json(`trainer ${idTrainer} asignada`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("trainer no asignada");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:6969/coordinador/0/xd/asignarGrupoTrainer/3/5


// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################



// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################


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
    
                res.json(`camper ${idCamper} asignado`)
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch {
            res.send("no se pudo asignar el camper ");
        }
    }
    await crearGrupo()
})

// curl -X PUT http://localhost:6969/coordinador/0/xd/asignarGrupoCamper/1/1

































// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################
// endpoint para obtener la informacion de un camper por id, autenticando la contraseña
app.get('/campers/:idCamper,:contrasena/verMiInfo', async (req, res) => {
    async function buscarCamper() {
        try {
            let { collection } = await conectar("campers");
            let id = req.params.idCamper;
            let contraseña = String(req.params.contrasena)
            let camper = await collection.findOne({ "idCamper": Number(id) })
            console.log(camper);
            if (camper.contrasena == contraseña) {
                res.json({
                    "idCamper": camper.idCamper,
                    "nombre": camper.nombre,
                    "apellido": camper.apellido,
                    "acudiente": camper.acudiente,
                    "telefono": camper.telefono,
                    "estado": camper.estado
                })
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (e) {
            console.log(e, 'error en crear colecciones')
        }
    }
    await buscarCamper();

}
);



// curl http://localhost:6969/campers/0,1/verMiInfo

app.get('/campers/:idCamper,:contrasena/academico', async (req, res) => {
    async function mirarInfoAcademica() {
        try {
            let { collection } = await conectar("campers");
            let id = req.params.idCamper;
            let contraseña = String(req.params.contrasena)
            let camper = await collection.findOne({ "idCamper": Number(id) })
            console.log(camper);
            if (camper.contrasena == contraseña) {
                res.json({
                    "idCamper": camper.idCamper,
                    "nombre": camper.nombre,
                    "apellido": camper.apellido,
                    "acudiente": camper.acudiente,
                    "telefono": camper.telefono,
                    "estado": camper.estado
                })
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (e) {
            console.log(e, 'error en crear colecciones')
        }
    }
    await mirarInfoAcademica();
}
);
///juan 







































// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################




//// Trainer verInfo
app.get('/trainers/:idTrainer,:contrasena/verMiInfo', async (req, res) => {
    async function buscarTrainer() {
        try {
            let { collection } = await conectar("trainers");
            let id = req.params.idTrainer;
            let contraseña = String(req.params.contrasena)
            let trainer = await collection.findOne({ "idTrainer": Number(id) })
            console.log(trainer);
            if (trainer.contrasena == contraseña) {
                res.json({
                    "idTrainer": trainer.idTrainer,
                    "nombre": trainer.nombre,
                    "apellido": trainer.apellido,
                    "telefono": trainer.telefono,
                    "horario": trainer.idHorarios,
                    "grupos": trainer.idGrupos,
                })
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (e) {
            console.log(e, 'error en crear colecciones')
        }
    }
    await buscarTrainer();
}
);

// curl http://localhost:6969/trainers/0,2/verMiInfo
// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################







// llamar a el servidor para ejecutar los endpoints
app.listen(PORT, () => {
    console.log("server iniciadoo");
}
);
//  curl -X POST http://localhost:6969/crearCoordinador   -H "Content-Type: application/json"   -d '{"contrasena":"xd","nombre":"juan","apellido":"perez"}'


app.get('/coordinador/:idCoordinador,:contrasena/verMiInfo', async (req, res) => {
    async function buscarCoordinador() {
        try {
            let { collection } = await conectar("coordinador");
            let id = req.params.idCoordinador;
            let contraseña = String(req.params.contrasena)
            let coordinador = await collection.findOne({ "idCoordinador": Number(id) })
            console.log(coordinador);
            if (coordinador.contrasena == contraseña) {
                res.json({
                    "idCoordinador": coordinador.idCoordinador,
                    "nombre": coordinador.nombre,
                    "apellido": coordinador.apellido
                })
            } else {
                res.json("id o contraseña incorrectos")
            }
        } catch (e) {
            console.log(e, 'error al iniciar sesion')
        }
    }
    await buscarCoordinador();
}
);


// curl http://localhost:6969/coordinador/0,xd/verMiInfo

// ############################################################################################################################################################################################################################
// ############################################################################################################################################################################################################################ 
