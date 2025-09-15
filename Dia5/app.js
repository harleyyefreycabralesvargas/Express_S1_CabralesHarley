import "dotenv/config";
import express from "express";

import swaggerUI from 'swagger-ui-express'
import swaggerDocumentation from './swagger.json'  with { type: 'json' };


import { Database } from "./config/db.js";

import { UserModel } from "./models/userModel.js";
import { UserRepository } from "./repositories/userRepository.js";
import { UserService } from "./services/userService.js";
import { UserController } from "./controllers/userController.js";
import { buildUserRouter } from "./routes/userRoutes.js";

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.db = new Database(process.env.MONGODB_URI);
    }
    async init() {
        await this.db.connect();
        this.app.use(express.json());
        this.app.use('/doc',swaggerUI.serve,swaggerUI.setup(swaggerDocumentation))
        this.app.get("/", (req, res) => {
            res.json({
                ok: true,
                service: "SERVICIO CRUD DE USUARIO"
            })
        });
        const userRepo = new UserRepository(UserModel);
        const userSrv = new UserService(userRepo);
        const userCtrl = new UserController(userSrv);
        this.app.use("/api/users", buildUserRouter(userCtrl));
        this.app.listen(this.port, () => {
            console.log("Server running on :" + this.port);
        })
    }
}
const app = new App();
app.init(); 

// endpoints del crud de usuarios

// crear un usuario 
// curl -X POST http://localhost:3000/api/users \
// -H "Content-Type: application/json" \
// -d '{
//   "name": "miguel",
//   "email": "miguel@gmail.com",
//   "age": 17
// }'

// listar todos los usuarios 
// curl -X GET http://localhost:3000/api/users

// obtener un usuario por id
// curl -X GET http://localhost:3000/api/users/:id_del_usuario

// actualizar un usuario por id
// curl -X PUT http://localhost:3000/api/users/68c7a33df26a7ec3bc3690a6 -H "Content-Type: application/json" -d '{
//   "name": "Miguel actualizado",
//   "email": "newMiguel@gmail.com",
//   "age": 18
// }'

// eliminar un usuario por id
// curl -X DELETE http://localhost:3000/api/users/:id_del_usuario

// ver Swagger

// en navegador para ver el swagger:
// http://localhost:3000/doc


// curl -X PUT http://localhost:3000/api/users/:id_del_usuario -H "Content-Type: application/json" -d '{   "name": "Miguel actualizado",   "email": "newMiguel@gmail.com",   "age": 18 }'  