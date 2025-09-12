export class UserController {
    constructor(userService) {
        this.service = userService;
    }
    create = async (req, res) => {
        try {
            const user = await this.service.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
    list = async (req, res) => {
        try {
            const users = await this.service.listUser(10);
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    get = async (req, res) => {
        try {
            const user = await this.service.getUser(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
    update = async (req, res) => {
        try {
            const user = await this.service.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
    delete = async (req, res) => {
        try {
            const user = await this.service.deleteUser(req.params.id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json({ message: "Usuario eliminado" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}