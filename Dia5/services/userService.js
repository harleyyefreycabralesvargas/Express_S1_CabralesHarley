export class UserService {
    constructor(userRepository) {
        this.repo = userRepository
    }

    async createUser(dto) {
        const exists = await this.repo.findByEmail(dto.email);
        if (exists) {
            throw new Error("El correo ya está registrado");
        }
        return this.repo.create(dto);
    }
    async listUser(limit=10) {
        return this.repo.findAll(limit);
    }
    async getUser(id) {
        return this.repo.findById(id);
    }
    async updateUser(id, dto) {
        return this.repo.updateById(id, dto);
    }
    async deleteUser(id) {
        return this.repo.deleteById(id);
    }
}