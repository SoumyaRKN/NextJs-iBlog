import { connect, Schema, model, models } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await connect(process.env.MONGO_DB_URL);
}

const ContactSchema = new Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

export default models.Contact || model('Contact', ContactSchema);