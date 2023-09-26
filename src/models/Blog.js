import { connect, Schema, model, models } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await connect(process.env.MONGO_DB_URL);
}

const BlogSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "General" },
    author: { type: String, required: true },
    authorOccupation: { type: String, default: "Unknown" },
    authorImg: { type: String },
    views: { type: Number, required: true }
}, { timestamps: true });

export default models.Blog || model('Blog', BlogSchema);