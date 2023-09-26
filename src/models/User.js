import { connect, Schema, model, models } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await connect(process.env.MONGO_DB_URL);
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    occupation: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default models.User || model('User', UserSchema);