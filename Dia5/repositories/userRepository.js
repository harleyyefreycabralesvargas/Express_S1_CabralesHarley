export class UserRepository {
    constructor(UserModel) {
        this.User = UserModel;
    }
    async create(data) {
        return this.User.create(data);
    }
    async findAll(limit=10) {
        return this.User.find().limit(limit);;
    }
    async findById(id) {
        return this.User.findById(id);
    }
    async updateById(id, data) {
        return this.User.findByIdAndUpdate(id, data);
    }
    async deleteById(id) {
        return this.User.findByIdAndDelete(id);
    }
    async findByEmail(email) {
        return this.User.findOne({ email });
    }
}