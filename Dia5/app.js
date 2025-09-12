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
