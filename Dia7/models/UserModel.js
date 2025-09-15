import dotenv from "dotenv"
dotenv.config();
import { MongoClient, ObjectId } from "mongodb"
;

class UserModel {
    constructor(db) {
        this.client = new MongoClient(process.env.MONGO_URI);
        this.dbName = process.env.DB_NAME;
    };

    async connect() {
        if (db) return db;
        await this.client.connect();
        db = this.client.db(this.dbName);
        return db.collection(`users`);
    };

    async findAll() {
        const collection = await this.connect();
        return await collection.findMany().toArray();
    };

    async findUserById(_id) {
        const collection = await this.connect();
        return await collection.findOne({ _id });
    };

    async findUserByEmail(email) {
        const collection = await this.connect();
        return await collection.findOne({ email });
    };

    async createUser(userData) {
        const collection = this.connect();
        return await collection.insertOne(userData);
    };

    async updateUser(_id, userData) {
        const collection = this.connect();
        return await collection.replaceOne({ _id }, userData);
    };

    async deleteUser(_id) {
        const collection = this.connect();
        return await collection.deleteOne({ _id });
    };
};

module.exports = { UserModel };