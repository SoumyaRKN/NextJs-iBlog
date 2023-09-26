import { connect, Schema, model, models } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await connect(process.env.MONGO_DB_URL);
}

const CommentReplySchema = new Schema({
    commentId: { type: String, required: true },
    replyerName: { type: String, required: true },
    replyerImg: { type: String },
    content: { type: String, required: true }
}, { timestamps: true });

export default models.CommentReply || model('CommentReply', CommentReplySchema);